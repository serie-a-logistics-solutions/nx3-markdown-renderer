/**
 * Custom element wrapper around the framework-agnostic MarkDownRenderer.
 *
 * Usage (Vanilla JS):
 *
 *   <script type="module"
 *     src="https://cdn.jsdelivr.net/gh/serie-a-logistics-solutions/nx3-markdown-renderer@v0.1.0/dist/nx3-markdown-renderer.esm.js">
 *   </script>
 *   <nx3-markdown-renderer text="# Hello **world**"></nx3-markdown-renderer>
 *
 * Usage (programmatic):
 *
 *   const el = document.createElement('nx3-markdown-renderer');
 *   el.text = '# Hello';
 *   el.toc = true;
 *   document.body.append(el);
 *
 * Attributes / properties:
 *   text                        Markdown source. Property assignment is preferred
 *                               for long / multiline content.
 *   anchors            boolean  Show heading anchor links (default: true).
 *   toc                boolean  Render a table of contents from h1-h3 (default: false).
 *   toc-collapsed      boolean  Start the TOC collapsed (default: false).
 *
 * Post-render extension points (property-only, no attribute):
 *   postRender  (host, root) => void | Promise<void>
 *               Called after every render (including after async mermaid
 *               diagrams have been rendered into the shadow DOM). Use this to
 *               augment or rewrite the rendered HTML from the consuming app.
 *
 * Events:
 *   nx3-render  CustomEvent<{ host: HTMLElement; root: ShadowRoot }>
 *               Dispatched after every render, right after `postRender` has
 *               resolved. Bubbles and is composed so listeners outside the
 *               shadow root receive it.
 */

import { MarkDownRenderer } from "./markdown-renderer-core";
import { bundledStyles } from "./styles/index";

/**
 * Signature of the `postRender` hook. Receives the internal host element
 * (containing the rendered markdown) and the shadow root. May return a
 * promise; the component awaits it before dispatching the `nx3-render` event.
 */
export type Nx3PostRenderFn = (host: HTMLElement, root: ShadowRoot) => void | Promise<void>;

/** Detail payload of the `nx3-render` custom event. */
export interface Nx3RenderEventDetail {
  host: HTMLElement;
  root: ShadowRoot;
}

const OBSERVED_ATTRIBUTES = [
  "text",
  "anchors",
  "toc",
  "toc-collapsed",
  "collapse-heading-level",
  "collapse-from-heading-index",
  "collapse-show-more-label",
  "collapse-show-less-label",
] as const;

export class Nx3MarkdownRendererElement extends HTMLElement {
  static get observedAttributes(): string[] {
    return [...OBSERVED_ATTRIBUTES];
  }

  private readonly root: ShadowRoot;
  private readonly host: HTMLDivElement;
  private renderer: MarkDownRenderer;
  private renderScheduled = false;
  private _postRender: Nx3PostRenderFn | null = null;
  // Monotonic render counter used to guard against stale async post-render
  // hooks (e.g. when `text` changes while a previous render is still awaiting
  // mermaid). Only the latest render is allowed to run its post-render step.
  private renderSeq = 0;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    // Prefer constructable stylesheets when available. Falls back to a <style>
    // element for browsers/environments that do not implement it (e.g. some
    // older WebKit versions and Node-based SSR).
    if ("adoptedStyleSheets" in Document.prototype && typeof CSSStyleSheet !== "undefined") {
      try {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(bundledStyles);
        this.root.adoptedStyleSheets = [sheet];
      } catch {
        this.injectStyleTag();
      }
    } else {
      this.injectStyleTag();
    }

    this.host = document.createElement("div");
    this.host.className = "nx3-markdown-renderer";
    this.root.append(this.host);

    this.renderer = new MarkDownRenderer({ anchors: this.anchors });
  }

  private injectStyleTag(): void {
    const styleEl = document.createElement("style");
    styleEl.textContent = bundledStyles;
    this.root.append(styleEl);
  }

  connectedCallback(): void {
    // Upgrade any properties that were set before the element was defined.
    // Without this, pre-upgrade property assignments become own-properties
    // that shadow the prototype's setters, so setAttribute is never called.
    for (const prop of [
      "text",
      "anchors",
      "toc",
      "tocCollapsed",
      "collapseHeadingLevel",
      "collapseFromHeadingIndex",
      "collapseShowMoreLabel",
      "collapseShowLessLabel",
    ]) {
      if (Object.prototype.hasOwnProperty.call(this, prop)) {
        const value = (this as any)[prop];
        delete (this as any)[prop];
        (this as any)[prop] = value;
      }
    }
    this.scheduleRender();
  }

  attributeChangedCallback(name: string): void {
    if (!this.isConnected) return;
    if (name === "anchors") {
      this.renderer = new MarkDownRenderer({ anchors: this.anchors });
    }
    this.scheduleRender();
  }

  // Coalesce multiple attribute writes (which arrive one at a time) into a
  // single render on the next microtask. Prevents pathological re-render
  // storms when the host sets several attributes in a row.
  private scheduleRender(): void {
    if (this.renderScheduled) return;
    this.renderScheduled = true;
    queueMicrotask(() => {
      this.renderScheduled = false;
      this.render();
    });
  }

  private render(): void {
    const seq = ++this.renderSeq;

    this.renderer.updateMessageWithThinking(this.host, this.text);
    this.renderer.highlightCodeBlocks(this.host);
    // Kick off mermaid rendering; we keep a handle so the post-render hook can
    // observe the fully-rendered DOM (including diagrams) instead of firing
    // before the async work completes.
    const mermaidDone = this.renderer.renderMermaidDiagrams(this.host).catch((err) => {
      console.warn("mermaid rendering failed:", err);
    });
    if (this.toc) {
      this.renderer.generateTocElement(this.host, this.tocCollapsed);
    }
    this.renderer.postProcessMarkdownElement(this.host);

    // Apply the collapse hook after post-processing so that transformed blocks
    // (tables, mermaid wrappers, etc.) are already in the DOM.
    if (this.collapseFromHeadingIndex > 0) {
      this.renderer.applyCollapse(this.host, {
        headingLevel: this.collapseHeadingLevel,
        fromHeadingIndex: this.collapseFromHeadingIndex,
        showMoreLabel: this.collapseShowMoreLabel,
        showLessLabel: this.collapseShowLessLabel,
      });
    }

    // Fire-and-forget: run the post-render hook and dispatch the event after
    // mermaid has finished so consumers see the final DOM. Guarded against
    // stale renders via the sequence counter.
    void this.runPostRender(seq, mermaidDone);
  }

  private async runPostRender(seq: number, mermaidDone: Promise<void>): Promise<void> {
    await mermaidDone;
    // Bail out if a newer render has started; that render will fire its own
    // post-render hook against the up-to-date DOM.
    if (seq !== this.renderSeq) return;

    if (this._postRender) {
      try {
        await this._postRender(this.host, this.root);
      } catch (err) {
        console.warn("postRender hook failed:", err);
      }
      if (seq !== this.renderSeq) return;
    }

    // Emit event for consumers that prefer the event-based extension point.
    // `composed: true` lets the event cross the shadow DOM boundary.
    this.dispatchEvent(
      new CustomEvent<Nx3RenderEventDetail>("nx3-render", {
        detail: { host: this.host, root: this.root },
        bubbles: true,
        composed: true,
      }),
    );
  }

  // ---- Reflected properties ----
  get text(): string {
    return this.getAttribute("text") ?? "";
  }
  set text(value: string) {
    // Setting an attribute is safe here because attributeChangedCallback
    // schedules the render.
    if (value == null) {
      this.removeAttribute("text");
    } else {
      this.setAttribute("text", value);
    }
  }

  get anchors(): boolean {
    return this.getAttribute("anchors") !== "false";
  }
  set anchors(value: boolean) {
    this.setAttribute("anchors", String(value));
  }

  get toc(): boolean {
    return this.getAttribute("toc") === "true" || (this.hasAttribute("toc") && this.getAttribute("toc") !== "false");
  }
  set toc(value: boolean) {
    this.setAttribute("toc", String(value));
  }

  get tocCollapsed(): boolean {
    return this.getAttribute("toc-collapsed") === "true";
  }
  set tocCollapsed(value: boolean) {
    this.setAttribute("toc-collapsed", String(value));
  }

  // ---- Collapse hook ----
  get collapseHeadingLevel(): number {
    const raw = this.getAttribute("collapse-heading-level");
    const parsed = raw == null ? Number.NaN : Number.parseInt(raw, 10);
    return Number.isFinite(parsed) && parsed >= 1 && parsed <= 6 ? parsed : 2;
  }
  set collapseHeadingLevel(value: number) {
    this.setAttribute("collapse-heading-level", String(value));
  }

  get collapseFromHeadingIndex(): number {
    const raw = this.getAttribute("collapse-from-heading-index");
    const parsed = raw == null ? Number.NaN : Number.parseInt(raw, 10);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
  }
  set collapseFromHeadingIndex(value: number) {
    this.setAttribute("collapse-from-heading-index", String(value));
  }

  get collapseShowMoreLabel(): string {
    return this.getAttribute("collapse-show-more-label") ?? "";
  }
  set collapseShowMoreLabel(value: string) {
    if (value == null) this.removeAttribute("collapse-show-more-label");
    else this.setAttribute("collapse-show-more-label", value);
  }

  get collapseShowLessLabel(): string {
    return this.getAttribute("collapse-show-less-label") ?? "";
  }
  set collapseShowLessLabel(value: string) {
    if (value == null) this.removeAttribute("collapse-show-less-label");
    else this.setAttribute("collapse-show-less-label", value);
  }

  // ---- Post-render hook (property-only; functions cannot be attributes) ----
  /**
   * Optional callback invoked after each render, once mermaid diagrams have
   * finished rendering. Return a promise to defer the `nx3-render` event
   * until async post-processing completes.
   */
  get postRender(): Nx3PostRenderFn | null {
    return this._postRender;
  }
  set postRender(fn: Nx3PostRenderFn | null) {
    this._postRender = fn;
    // Re-render so the newly attached hook runs against the current DOM.
    if (this.isConnected) this.scheduleRender();
  }
}

// Register the custom element as a side effect of importing this module.
// Consumers can either import 'nx3-markdown-renderer' for the side effect or
// import the class from 'nx3-markdown-renderer/core' when they want to build
// their own wrapper.
const TAG_NAME = "nx3-markdown-renderer";
if (typeof customElements !== "undefined" && !customElements.get(TAG_NAME)) {
  customElements.define(TAG_NAME, Nx3MarkdownRendererElement);
}

// Re-export the core class for consumers who prefer direct access.
export { MarkDownRenderer } from "./markdown-renderer-core";
export type { MarkDownRendererOptions } from "./markdown-renderer-core";
