var i = Object.defineProperty;
var c = (o, n, e) => n in o ? i(o, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[n] = e;
var t = (o, n, e) => c(o, typeof n != "symbol" ? n + "" : n, e);
import { MarkDownRenderer as d } from "./markdown-renderer-core.js";
import { configureExternalLibs as w } from "./markdown-renderer-core.js";
const h = `pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}/*!
  Theme: GitHub
  Description: Light theme as seen on github.com
  Author: github.com
  Maintainer: @Hirse
  Updated: 2021-05-15

  Outdated base version: https://github.com/primer/github-syntax-light
  Current colors taken from GitHub's CSS
*/.hljs{color:#24292e;background:#fff}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#d73a49}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#6f42c1}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-variable,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id{color:#005cc5}.hljs-regexp,.hljs-string,.hljs-meta .hljs-string{color:#032f62}.hljs-built_in,.hljs-symbol{color:#e36209}.hljs-comment,.hljs-code,.hljs-formula{color:#6a737d}.hljs-name,.hljs-quote,.hljs-selector-tag,.hljs-selector-pseudo{color:#22863a}.hljs-subst{color:#24292e}.hljs-section{color:#005cc5;font-weight:700}.hljs-bullet{color:#735c0f}.hljs-emphasis{color:#24292e;font-style:italic}.hljs-strong{color:#24292e;font-weight:700}.hljs-addition{color:#22863a;background-color:#f0fff4}.hljs-deletion{color:#b31d28;background-color:#ffeef0}`, p = ':host{display:block;width:100%}.nx3-markdown-renderer{display:block;width:100%}.nx3-markdown-renderer .message-text{line-height:1.4}.nx3-markdown-renderer .thinking-block{border:1px solid #d1d5db;border-radius:6px;margin:8px 0;background:#f9fafb}.nx3-markdown-renderer .thinking-header{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;cursor:pointer;user-select:none;font-weight:500}.nx3-markdown-renderer .thinking-toggle{transition:transform .2s ease}.nx3-markdown-renderer .thinking-toggle.expanded{transform:rotate(180deg)}.nx3-markdown-renderer .thinking-content{padding:0 12px;overflow:hidden;white-space:pre-wrap}.nx3-markdown-renderer .thinking-content.collapsed{max-height:0;padding-top:0;padding-bottom:0}.nx3-markdown-renderer .thinking-content.expanded{max-height:none;padding-top:8px;padding-bottom:8px}.nx3-markdown-renderer .code-block-wrapper{border:1px solid #e5e7eb;border-radius:6px;margin:8px 0;overflow:hidden}.nx3-markdown-renderer .code-block-header{display:flex;align-items:center;justify-content:space-between;padding:6px 12px;background:#f3f4f6;font-size:.85rem;font-family:monospace}.nx3-markdown-renderer .code-block-header .copy-btn{border:none;background:transparent;cursor:pointer;font-size:.85rem}.nx3-markdown-renderer .code-block-wrapper pre{margin:0;padding:12px;overflow-x:auto;background:#fff}.nx3-markdown-renderer .mermaid-wrapper,.nx3-markdown-renderer .svg-wrapper,.nx3-markdown-renderer .canvas-wrapper{border:1px solid #e5e7eb;border-radius:6px;margin:8px 0;overflow:hidden;background:#fff}.nx3-markdown-renderer .mermaid-toolbar{display:flex;align-items:center;gap:6px;padding:6px 8px;background:#f3f4f6;font-size:.85rem}.nx3-markdown-renderer .mermaid-toolbar-title{margin-right:auto;font-weight:500}.nx3-markdown-renderer .mermaid-btn{display:inline-flex;align-items:center;gap:4px;border:1px solid #d1d5db;background:#fff;border-radius:4px;padding:2px 8px;cursor:pointer;font-size:.8rem}.nx3-markdown-renderer .mermaid-btn-sep{width:1px;height:18px;background:#d1d5db}.nx3-markdown-renderer .mermaid-pan-container{width:100%;height:400px;overflow:hidden;background:#fff}.nx3-markdown-renderer .mermaid-resize-handle{height:8px;cursor:ns-resize;background:#f3f4f6;border-top:1px solid #e5e7eb}.nx3-markdown-renderer .mermaid-resize-handle.dragging{background:#d1d5db}.nx3-markdown-renderer .svg-render-container,.nx3-markdown-renderer .canvas-render-container{padding:8px;text-align:center}.nx3-markdown-renderer .svg-render-container svg,.nx3-markdown-renderer .canvas-render-container canvas{max-width:100%}.nx3-markdown-renderer .alert{border-left:4px solid #6b7280;border-radius:4px;padding:8px 12px;margin:8px 0;background:#f9fafb}.nx3-markdown-renderer .alert-header{font-weight:600;margin-bottom:4px}.nx3-markdown-renderer .alert-header .alert-icon{margin-right:4px}.nx3-markdown-renderer .alert-note{border-left-color:#3b82f6;background:#eff6ff}.nx3-markdown-renderer .alert-tip{border-left-color:#10b981;background:#ecfdf5}.nx3-markdown-renderer .alert-important{border-left-color:#8b5cf6;background:#f5f3ff}.nx3-markdown-renderer .alert-warning{border-left-color:#f59e0b;background:#fffbeb}.nx3-markdown-renderer .alert-caution{border-left-color:#ef4444;background:#fef2f2}.nx3-markdown-renderer table.markdown-table,.nx3-markdown-renderer table.table{width:100%;border-collapse:collapse;margin:8px 0}.nx3-markdown-renderer table.markdown-table th,.nx3-markdown-renderer table.markdown-table td,.nx3-markdown-renderer table.table th,.nx3-markdown-renderer table.table td{border:1px solid #e5e7eb;padding:6px 8px;text-align:left}.nx3-markdown-renderer table.markdown-table thead th,.nx3-markdown-renderer table.markdown-table tr:first-child th,.nx3-markdown-renderer table.table thead th,.nx3-markdown-renderer table.table tr:first-child th{background:#f3f4f6}.nx3-markdown-renderer .heading-anchor{margin-left:6px;opacity:0;text-decoration:none;transition:opacity .2s ease}.nx3-markdown-renderer h1:hover .heading-anchor,.nx3-markdown-renderer h2:hover .heading-anchor,.nx3-markdown-renderer h3:hover .heading-anchor,.nx3-markdown-renderer h4:hover .heading-anchor,.nx3-markdown-renderer h5:hover .heading-anchor,.nx3-markdown-renderer h6:hover .heading-anchor{opacity:.6}.nx3-markdown-renderer .doc-toc{border:1px solid #e5e7eb;border-radius:6px;padding:8px 12px;margin:8px 0;background:#f9fafb}.nx3-markdown-renderer .doc-toc-title{font-weight:600;cursor:pointer;display:inline-block;margin-bottom:4px}.nx3-markdown-renderer .doc-toc.doc-toc-collapsed ul{display:none}.nx3-markdown-renderer .doc-toc ul{list-style:none;padding-left:0;margin:0}.nx3-markdown-renderer .toc-l2{padding-left:12px}.nx3-markdown-renderer .toc-l3{padding-left:24px}.nx3-markdown-renderer .mermaid-error{color:#b91c1c;background:#fee2e2;border-radius:4px;padding:8px;font-family:monospace;font-size:.85rem}.nx3-markdown-renderer .nx3-collapse-wrapper{position:relative;margin:24px 0}.nx3-markdown-renderer .nx3-collapse-content{overflow:hidden}.nx3-markdown-renderer .nx3-collapse-collapsed .nx3-collapse-content{display:none}.nx3-markdown-renderer .nx3-collapse-toggle{display:flex;align-items:center;gap:12px;width:100%;padding:0;margin:0;border:none;background:transparent;color:#4b5563;font-family:inherit;font-size:.9rem;font-weight:500;cursor:pointer;text-align:left}.nx3-markdown-renderer .nx3-collapse-toggle:before,.nx3-markdown-renderer .nx3-collapse-toggle:after{content:"";flex:1;height:1px;background:#e5e7eb}.nx3-markdown-renderer .nx3-collapse-toggle-label{display:inline-flex;align-items:center;gap:8px;padding:8px 16px;border:1px solid #d1d5db;border-radius:999px;background:#fff;color:#374151;white-space:nowrap;transition:background .15s ease,border-color .15s ease,color .15s ease,box-shadow .15s ease}.nx3-markdown-renderer .nx3-collapse-toggle:hover .nx3-collapse-toggle-label{background:#f9fafb;border-color:#9ca3af;color:#111827;box-shadow:0 1px 2px #0000000a}.nx3-markdown-renderer .nx3-collapse-toggle:focus-visible{outline:none}.nx3-markdown-renderer .nx3-collapse-toggle:focus-visible .nx3-collapse-toggle-label{outline:2px solid #3b82f6;outline-offset:2px}.nx3-markdown-renderer .nx3-collapse-toggle-chevron{display:inline-block;width:10px;height:10px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:rotate(45deg) translate(-2px,-2px);transition:transform .2s ease}.nx3-markdown-renderer .nx3-collapse-wrapper:not(.nx3-collapse-collapsed) .nx3-collapse-toggle-chevron{transform:rotate(-135deg) translate(-2px,-2px)}.nx3-markdown-renderer .nx3-collapse-toggle-hint{color:#9ca3af;font-weight:400;font-size:.8rem}', s = `${h}
${p}`, g = [
  "text",
  "anchors",
  "toc",
  "toc-collapsed",
  "collapse-heading-level",
  "collapse-from-heading-index",
  "collapse-show-more-label",
  "collapse-show-less-label"
];
class m extends HTMLElement {
  constructor() {
    super();
    t(this, "root");
    t(this, "host");
    t(this, "renderer");
    t(this, "renderScheduled", !1);
    t(this, "_postRender", null);
    // Monotonic render counter used to guard against stale async post-render
    // hooks (e.g. when `text` changes while a previous render is still awaiting
    // mermaid). Only the latest render is allowed to run its post-render step.
    t(this, "renderSeq", 0);
    if (this.root = this.attachShadow({ mode: "open" }), "adoptedStyleSheets" in Document.prototype && typeof CSSStyleSheet < "u")
      try {
        const e = new CSSStyleSheet();
        e.replaceSync(s), this.root.adoptedStyleSheets = [e];
      } catch {
        this.injectStyleTag();
      }
    else
      this.injectStyleTag();
    this.host = document.createElement("div"), this.host.className = "nx3-markdown-renderer", this.root.append(this.host), this.renderer = new d({ anchors: this.anchors });
  }
  static get observedAttributes() {
    return [...g];
  }
  injectStyleTag() {
    const e = document.createElement("style");
    e.textContent = s, this.root.append(e);
  }
  connectedCallback() {
    for (const e of [
      "text",
      "anchors",
      "toc",
      "tocCollapsed",
      "collapseHeadingLevel",
      "collapseFromHeadingIndex",
      "collapseShowMoreLabel",
      "collapseShowLessLabel"
    ])
      if (Object.prototype.hasOwnProperty.call(this, e)) {
        const r = this[e];
        delete this[e], this[e] = r;
      }
    this.scheduleRender();
  }
  attributeChangedCallback(e) {
    this.isConnected && (e === "anchors" && (this.renderer = new d({ anchors: this.anchors })), this.scheduleRender());
  }
  // Coalesce multiple attribute writes (which arrive one at a time) into a
  // single render on the next microtask. Prevents pathological re-render
  // storms when the host sets several attributes in a row.
  scheduleRender() {
    this.renderScheduled || (this.renderScheduled = !0, queueMicrotask(() => {
      this.renderScheduled = !1, this.render();
    }));
  }
  render() {
    const e = ++this.renderSeq;
    this.renderer.updateMessageWithThinking(this.host, this.text), this.renderer.highlightCodeBlocks(this.host);
    const r = this.renderer.renderMermaidDiagrams(this.host).catch((a) => {
      console.warn("mermaid rendering failed:", a);
    });
    this.toc && this.renderer.generateTocElement(this.host, this.tocCollapsed), this.renderer.postProcessMarkdownElement(this.host), this.collapseFromHeadingIndex > 0 && this.renderer.applyCollapse(this.host, {
      headingLevel: this.collapseHeadingLevel,
      fromHeadingIndex: this.collapseFromHeadingIndex,
      showMoreLabel: this.collapseShowMoreLabel,
      showLessLabel: this.collapseShowLessLabel
    }), this.runPostRender(e, r);
  }
  async runPostRender(e, r) {
    if (await r, e === this.renderSeq) {
      if (this._postRender) {
        try {
          await this._postRender(this.host, this.root);
        } catch (a) {
          console.warn("postRender hook failed:", a);
        }
        if (e !== this.renderSeq) return;
      }
      this.dispatchEvent(
        new CustomEvent("nx3-render", {
          detail: { host: this.host, root: this.root },
          bubbles: !0,
          composed: !0
        })
      );
    }
  }
  // ---- Reflected properties ----
  get text() {
    return this.getAttribute("text") ?? "";
  }
  set text(e) {
    e == null ? this.removeAttribute("text") : this.setAttribute("text", e);
  }
  get anchors() {
    return this.getAttribute("anchors") !== "false";
  }
  set anchors(e) {
    this.setAttribute("anchors", String(e));
  }
  get toc() {
    return this.getAttribute("toc") === "true" || this.hasAttribute("toc") && this.getAttribute("toc") !== "false";
  }
  set toc(e) {
    this.setAttribute("toc", String(e));
  }
  get tocCollapsed() {
    return this.getAttribute("toc-collapsed") === "true";
  }
  set tocCollapsed(e) {
    this.setAttribute("toc-collapsed", String(e));
  }
  // ---- Collapse hook ----
  get collapseHeadingLevel() {
    const e = this.getAttribute("collapse-heading-level"), r = e == null ? Number.NaN : Number.parseInt(e, 10);
    return Number.isFinite(r) && r >= 1 && r <= 6 ? r : 2;
  }
  set collapseHeadingLevel(e) {
    this.setAttribute("collapse-heading-level", String(e));
  }
  get collapseFromHeadingIndex() {
    const e = this.getAttribute("collapse-from-heading-index"), r = e == null ? Number.NaN : Number.parseInt(e, 10);
    return Number.isFinite(r) && r >= 0 ? r : 0;
  }
  set collapseFromHeadingIndex(e) {
    this.setAttribute("collapse-from-heading-index", String(e));
  }
  get collapseShowMoreLabel() {
    return this.getAttribute("collapse-show-more-label") ?? "";
  }
  set collapseShowMoreLabel(e) {
    e == null ? this.removeAttribute("collapse-show-more-label") : this.setAttribute("collapse-show-more-label", e);
  }
  get collapseShowLessLabel() {
    return this.getAttribute("collapse-show-less-label") ?? "";
  }
  set collapseShowLessLabel(e) {
    e == null ? this.removeAttribute("collapse-show-less-label") : this.setAttribute("collapse-show-less-label", e);
  }
  // ---- Post-render hook (property-only; functions cannot be attributes) ----
  /**
   * Optional callback invoked after each render, once mermaid diagrams have
   * finished rendering. Return a promise to defer the `nx3-render` event
   * until async post-processing completes.
   */
  get postRender() {
    return this._postRender;
  }
  set postRender(e) {
    this._postRender = e, this.isConnected && this.scheduleRender();
  }
}
const l = "nx3-markdown-renderer";
typeof customElements < "u" && !customElements.get(l) && customElements.define(l, m);
export {
  d as MarkDownRenderer,
  m as Nx3MarkdownRendererElement,
  w as configureExternalLibs
};
//# sourceMappingURL=nx3-markdown-renderer.esm.js.map
