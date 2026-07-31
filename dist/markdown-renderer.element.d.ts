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
export declare class Nx3MarkdownRendererElement extends HTMLElement {
    static get observedAttributes(): string[];
    private readonly root;
    private readonly host;
    private renderer;
    private renderScheduled;
    private _postRender;
    private renderSeq;
    constructor();
    private injectStyleTag;
    connectedCallback(): void;
    attributeChangedCallback(name: string): void;
    private scheduleRender;
    private render;
    private runPostRender;
    get text(): string;
    set text(value: string);
    get anchors(): boolean;
    set anchors(value: boolean);
    get toc(): boolean;
    set toc(value: boolean);
    get tocCollapsed(): boolean;
    set tocCollapsed(value: boolean);
    get collapseHeadingLevel(): number;
    set collapseHeadingLevel(value: number);
    get collapseFromHeadingIndex(): number;
    set collapseFromHeadingIndex(value: number);
    get collapseShowMoreLabel(): string;
    set collapseShowMoreLabel(value: string);
    get collapseShowLessLabel(): string;
    set collapseShowLessLabel(value: string);
    /**
     * Optional callback invoked after each render, once mermaid diagrams have
     * finished rendering. Return a promise to defer the `nx3-render` event
     * until async post-processing completes.
     */
    get postRender(): Nx3PostRenderFn | null;
    set postRender(fn: Nx3PostRenderFn | null);
}
export { configureExternalLibs, MarkDownRenderer } from "./markdown-renderer-core";
export type { ExternalLibSources, MarkDownRendererOptions } from "./markdown-renderer-core";
//# sourceMappingURL=markdown-renderer.element.d.ts.map