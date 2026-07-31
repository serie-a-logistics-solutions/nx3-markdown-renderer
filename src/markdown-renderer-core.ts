/**
 * Framework-agnostic Markdown renderer.
 *
 * Direct port of the standalone `MarkDownRenderer` implementation used by the
 * Angular component in the seriea_nx3_core_ui repository. External libraries
 * (highlight.js, mermaid, svg-pan-zoom, DOMPurify) are imported as real ES
 * modules so this class is self-contained. Mermaid and svg-pan-zoom are loaded
 * lazily via dynamic import() so their (large) bundles are only fetched when a
 * document actually contains a diagram.
 */

import DOMPurify from "dompurify";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import markdown from "highlight.js/lib/languages/markdown";
import plaintext from "highlight.js/lib/languages/plaintext";
import scss from "highlight.js/lib/languages/scss";
import shell from "highlight.js/lib/languages/shell";
import sql from "highlight.js/lib/languages/sql";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("json", json);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("sh", bash);
hljs.registerLanguage("shell", shell);
hljs.registerLanguage("css", css);
hljs.registerLanguage("scss", scss);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("md", markdown);
hljs.registerLanguage("java", java);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("yml", yaml);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("plaintext", plaintext);
hljs.registerLanguage("text", plaintext);

export interface MarkDownRendererOptions {
  anchors?: boolean;
}

export interface CollapseOptions {
  /** Heading level (1-6) that triggers the collapse hook. Default: 2. */
  headingLevel?: number;
  /**
   * 1-based index of the heading (of `headingLevel`) from which the content
   * should be collapsed. `0` disables the feature.
   */
  fromHeadingIndex?: number;
  /** Custom label for the collapsed state. */
  showMoreLabel?: string;
  /** Custom label for the expanded state. */
  showLessLabel?: string;
}

interface Segment {
  type: "text" | "mermaid" | "svg" | "canvas" | "code";
  content: string;
  language?: string;
}

interface ThinkingPart {
  type: "text" | "thinking";
  content: string;
  incomplete?: boolean;
}

// Lazy-loaded modules. Mermaid pulls in ~500 KB and is only needed when the
// document contains a ```mermaid block; svg-pan-zoom is only needed for the
// interactive diagram viewer.
// Note: svg-pan-zoom ships CommonJS typings (`export = svgPanZoom`) so the
// module namespace itself is the callable factory. We alias that type and
// unwrap the synthetic esModuleInterop default at runtime.
type SvgPanZoomModule = typeof import("svg-pan-zoom");
type SvgPanZoomFactory = SvgPanZoomModule extends (...args: infer A) => infer R ? (...args: A) => R : SvgPanZoomModule;

let mermaidModulePromise: Promise<typeof import("mermaid").default> | null = null;
let svgPanZoomModulePromise: Promise<SvgPanZoomFactory> | null = null;

async function getMermaid(): Promise<typeof import("mermaid").default> {
  if (!mermaidModulePromise) {
    mermaidModulePromise = import("mermaid").then((m) => {
      m.default.initialize({ startOnLoad: false, theme: "default" });
      return m.default;
    });
  }
  return mermaidModulePromise;
}

async function getSvgPanZoom(): Promise<SvgPanZoomFactory> {
  if (!svgPanZoomModulePromise) {
    // With esModuleInterop, the synthetic `default` holds the callable factory
    // at runtime; fall back to the module namespace if it isn't present.
    svgPanZoomModulePromise = import("svg-pan-zoom").then((m) => {
      const mod = m as unknown as { default?: SvgPanZoomFactory } & SvgPanZoomFactory;
      return (mod.default ?? mod) as SvgPanZoomFactory;
    });
  }
  return svgPanZoomModulePromise;
}

export class MarkDownRenderer {
  static tableStartTag = '<table class="table">';
  static tableEndTag = "</table>";
  templateUlStart = `<ul style="margin: 0 !important; padding: 0 0 0 16px !important;">`;

  private mermaidResizeObservers = new WeakMap<HTMLElement, ResizeObserver>();
  private mermaidRenderCache = new Map<string, string>();
  private _mermaidRenderPromises = new Map<string, Promise<string>>();
  private anchors: boolean;

  constructor(options: MarkDownRendererOptions = {}) {
    this.anchors = options.anchors !== undefined ? options.anchors : true;
  }

  updateMessageWithThinking(messageElement: HTMLElement, text: string): void {
    const parts = this.parseThinkingBlocks(text);

    const reusableWrappers = new Map<string, HTMLElement[]>();
    for (const wrapper of Array.from(
      messageElement.querySelectorAll(".mermaid-wrapper[data-diagram-source]"),
    ) as HTMLElement[]) {
      const key = wrapper.dataset["diagramSource"] || "";
      if (!reusableWrappers.has(key)) {
        reusableWrappers.set(key, []);
      }
      reusableWrappers.get(key)!.push(wrapper);
      wrapper.remove();
    }

    messageElement.innerHTML = "";

    let first = true;
    for (const part of parts) {
      if (!first) {
        messageElement.append(document.createElement("br"));
      }
      first = false;
      if (part.type === "thinking") {
        const thinkingBlock = this.createThinkingBlock(part.content);
        messageElement.append(thinkingBlock);
      } else {
        const segments = this.splitMermaidSegments(part.content);
        for (const seg of segments) {
          switch (seg.type) {
            case "mermaid": {
              const reusable = reusableWrappers.get(seg.content);
              if (reusable && reusable.length > 0) {
                messageElement.append(reusable.shift()!);
              } else {
                const wrapper = document.createElement("div");
                wrapper.className = "mermaid-wrapper";
                messageElement.append(wrapper);
                const cachedSvg = this.mermaidRenderCache.get(seg.content);
                if (cachedSvg) {
                  wrapper.dataset["diagramSource"] = seg.content;
                  this._buildMermaidUI(wrapper, cachedSvg);
                } else {
                  wrapper.innerHTML = `<div class="mermaid" data-diagram="${seg.content.replace(/"/g, "&quot;")}"></div>`;
                  this._ensureMermaidRendered(seg.content).catch((err) => console.error("Mermaid pre-render failed:", err));
                }
              }
              break;
            }
            case "svg": {
              this._renderSvgSegment(messageElement, seg);
              break;
            }
            case "canvas": {
              this._renderCanvasSegment(messageElement, seg);
              break;
            }
            case "code": {
              this._renderCodeSegment(messageElement, seg);
              break;
            }
            default: {
              const textNode = document.createElement("div");
              textNode.className = "message-text";
              textNode.innerHTML = this.parseMarkdown(seg.content);
              messageElement.append(textNode);
            }
          }
        }
      }
    }
  }

  highlightCodeBlocks(container: HTMLElement): void {
    for (const block of Array.from(container.querySelectorAll("pre code")) as HTMLElement[]) {
      delete block.dataset["highlighted"];
      try {
        hljs.highlightElement(block);
      } catch (err) {
        console.warn("highlight.js failed for block:", err);
      }
    }
  }

  async renderMermaidDiagrams(container: HTMLElement): Promise<void> {
    const nodes = container.querySelectorAll(".mermaid[data-diagram]");
    if (nodes.length === 0) return;

    for (const node of Array.from(nodes) as HTMLElement[]) {
      const diagram = (node.dataset["diagram"] || "")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"');

      const wrapper = (node.closest(".mermaid-wrapper") as HTMLElement) || (node.parentElement as HTMLElement);

      try {
        const svg = await this._ensureMermaidRendered(diagram);
        wrapper.dataset["diagramSource"] = diagram;
        this._buildMermaidUI(wrapper, svg);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        wrapper.outerHTML = `<div class="mermaid-error">Mermaid error: ${message}</div>`;
      }
    }
  }

  private _ensureMermaidRendered(diagram: string): Promise<string> {
    const cached = this.mermaidRenderCache.get(diagram);
    if (cached) return Promise.resolve(cached);

    let promise = this._mermaidRenderPromises.get(diagram);
    if (!promise) {
      promise = (async () => {
        const mermaid = await getMermaid();
        const id = "mermaid-" + Math.random().toString(36).slice(2, 9);
        const { svg } = await mermaid.render(id, diagram);
        this.mermaidRenderCache.set(diagram, svg);
        this._mermaidRenderPromises.delete(diagram);
        return svg;
      })();
      this._mermaidRenderPromises.set(diagram, promise);
    }
    return promise;
  }

  private async _buildMermaidUI(wrapper: HTMLElement, svg: string): Promise<void> {
    const toolbar = document.createElement("div");
    toolbar.className = "mermaid-toolbar";
    toolbar.innerHTML = `
      <span class="mermaid-toolbar-title">Diagram</span>
      <button class="mermaid-btn zoom-in" title="Zoom in">Zoom +</button>
      <button class="mermaid-btn zoom-out" title="Zoom out">Zoom -</button>
      <button class="mermaid-btn zoom-reset" title="Reset">Reset</button>
      <div class="mermaid-btn-sep"></div>
      <button class="mermaid-btn download-svg" title="Download as SVG">SVG</button>
      <button class="mermaid-btn download-png" title="Download as PNG">PNG</button>`;

    const panContainer = document.createElement("div");
    panContainer.className = "mermaid-pan-container";
    panContainer.innerHTML = svg;

    wrapper.innerHTML = "";
    wrapper.append(toolbar);
    wrapper.append(panContainer);

    const resizeHandle = document.createElement("div");
    resizeHandle.className = "mermaid-resize-handle";
    wrapper.append(resizeHandle);

    wrapper.dataset["originalSvg"] = svg;

    const svgEl = panContainer.querySelector("svg") as SVGSVGElement | null;
    if (svgEl) {
      svgEl.removeAttribute("width");
      svgEl.removeAttribute("height");
      svgEl.setAttribute("preserveAspectRatio", "xMidYMid meet");
      svgEl.style.width = "100%";
      svgEl.style.height = "100%";
      svgEl.style.display = "block";
      svgEl.style.maxWidth = "none";
      if (!svgEl.getAttribute("viewBox")) {
        const bbox = (svgEl as unknown as SVGGraphicsElement).getBBox?.();
        if (bbox) svgEl.setAttribute("viewBox", `0 0 ${bbox.width} ${bbox.height}`);
      }
    }

    let pz: ReturnType<Awaited<ReturnType<typeof getSvgPanZoom>>> | null = null;
    if (svgEl) {
      try {
        const svgPanZoom = await getSvgPanZoom();
        pz = svgPanZoom(svgEl, {
          zoomEnabled: true,
          panEnabled: true,
          controlIconsEnabled: false,
          fit: true,
          center: true,
          minZoom: 0.2,
          maxZoom: 10,
          zoomScaleSensitivity: 0.3,
        });
        this._setupMermaidAutoFit(wrapper, panContainer, pz);
        this._setupResizeHandle(resizeHandle, panContainer, pz);
      } catch (err) {
        console.warn("svg-pan-zoom failed to initialize:", err);
      }
    }

    toolbar.querySelector(".zoom-in")?.addEventListener("click", () => pz?.zoomIn());
    toolbar.querySelector(".zoom-out")?.addEventListener("click", () => pz?.zoomOut());
    toolbar.querySelector(".zoom-reset")?.addEventListener("click", () => {
      pz?.resetZoom();
      pz?.center();
    });

    toolbar.querySelector(".download-svg")?.addEventListener("click", () => {
      if (!svgEl) return;
      const svgSource = new XMLSerializer().serializeToString(svgEl);
      const blob = new Blob([svgSource], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "diagram.svg";
      a.click();
      URL.revokeObjectURL(url);
    });

    toolbar.querySelector(".download-png")?.addEventListener("click", () => {
      if (!svgEl) return;
      this._downloadSvgAsPng(svgEl, "diagram.png");
    });
  }

  private _downloadSvgAsPng(svgEl: SVGSVGElement, fileName: string): void {
    const clone = svgEl.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

    const vb = clone.getAttribute("viewBox");
    let w = 1200;
    let h = 900;
    if (vb) {
      const p = vb.trim().split(/[\s,]+/);
      if (p.length === 4) {
        w = Math.ceil(+p[2]) * 2 || 1200;
        h = Math.ceil(+p[3]) * 2 || 900;
      }
    } else {
      const bb = svgEl.getBoundingClientRect();
      if (bb.width > 0) {
        w = bb.width * 2;
        h = bb.height * 2;
      }
    }
    clone.setAttribute("width", String(w));
    clone.setAttribute("height", String(h));

    const styleBlocks = Array.from(svgEl.querySelectorAll("style"))
      .map((s) => s.textContent)
      .join("\n")
      .replace(/@import[^;]+;/g, "")
      .replace(/url\(['"]?https?:[^)]+['"]?\)/g, "none");
    if (styleBlocks) {
      const styleEl = document.createElementNS("http://www.w3.org/2000/svg", "style");
      styleEl.textContent = styleBlocks + "\n* { font-family: Arial, sans-serif !important; }";
      for (const s of Array.from(clone.querySelectorAll("style"))) s.remove();
      clone.insertBefore(styleEl, clone.firstChild);
    }

    const svgStr = new XMLSerializer().serializeToString(clone);
    const dataUrl = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgStr)));

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, w, h);
      try {
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = fileName;
        document.body.append(a);
        a.click();
        a.remove();
      } catch (e) {
        console.error("PNG export failed:", e);
      }
    };
    img.onerror = () => console.error("Failed to rasterize SVG for PNG export.");
    img.src = dataUrl;
  }

  private _setupMermaidAutoFit(wrapper: HTMLElement, panContainer: HTMLElement, panZoomInstance: unknown): void {
    const pz = panZoomInstance as { resize: () => void; fit: () => void; center: () => void } | null;
    if (!pz || !panContainer) return;

    const fitDiagram = () => {
      const { width, height } = panContainer.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;
      pz.resize();
      pz.fit();
      pz.center();
    };

    requestAnimationFrame(() => {
      fitDiagram();
      requestAnimationFrame(fitDiagram);
    });

    const previousObserver = this.mermaidResizeObservers.get(wrapper);
    if (previousObserver) previousObserver.disconnect();

    if (typeof ResizeObserver !== "undefined") {
      const resizeObserver = new ResizeObserver(() => fitDiagram());
      resizeObserver.observe(panContainer);
      this.mermaidResizeObservers.set(wrapper, resizeObserver);
    } else {
      window.addEventListener("resize", fitDiagram, { passive: true });
    }
  }

  private _setupResizeHandle(resizeHandle: HTMLElement, panContainer: HTMLElement, panZoomInstance: unknown): void {
    const pz = panZoomInstance as { resize: () => void; fit: () => void; center: () => void } | null;
    resizeHandle.addEventListener("mousedown", (e: MouseEvent) => {
      e.preventDefault();
      const startY = e.clientY;
      const startH = panContainer.getBoundingClientRect().height;

      resizeHandle.classList.add("dragging");

      const onMouseMove = (ev: MouseEvent) => {
        const newH = Math.max(100, startH + (ev.clientY - startY));
        panContainer.style.height = newH + "px";
        if (pz) {
          pz.resize();
          pz.fit();
          pz.center();
        }
      };

      const onMouseUp = () => {
        resizeHandle.classList.remove("dragging");
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  }

  parseMarkdown(text: string): string {
    if (!text) return "";

    text = text
      .replace(/\r\n/g, "\n")
      .replace(/\\r\\n/g, "\n")
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t");
    text = text
      .replace(/&nbsp;/g, " ")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&");

    const extractedBlocks: string[] = [];
    let html = text.replace(/^```([\w-]*)[ \t]*\r?\n([\s\S]*?)^```[ \t]*\r?$/gm, (_match, langToken, content) => {
      const lang = (langToken || "").trim().toLowerCase();
      const placeholder = `@@MDBLOCK${extractedBlocks.length}@@`;
      if (lang === "mermaid") {
        extractedBlocks.push(this._buildMermaidBlockHtml(content.trim()));
      } else {
        extractedBlocks.push(this._buildCodeBlockHtml(content, lang));
      }
      return `\n${placeholder}\n`;
    });

    const rawHtmlBlocks: string[] = [];
    html = this._extractRawHtml(html, rawHtmlBlocks);

    html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    html = html.replace(/[ \t]{2,}\n/g, "<br>\n");

    const slugify = (t: string) =>
      t
        .toLowerCase()
        .replace(/<[^>]*>/g, "")
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
    const headingSlugs: Record<string, number> = {};
    const headingWithId = (tag: string, content: string): string => {
      let slug = slugify(content);
      headingSlugs[slug] = (headingSlugs[slug] || 0) + 1;
      if (headingSlugs[slug] > 1) slug += "-" + (headingSlugs[slug] - 1);
      if (this.anchors) {
        return `<${tag} id="${slug}" class="mt-2">${content}<a class="heading-anchor" href="#${slug}" aria-label="Link to this heading">#</a></${tag}>`;
      }
      return `<${tag} id="${slug}" class="mt-2">${content}</${tag}>`;
    };
    html = html.replace(/^###### (.*$)/gm, (_m, c) => headingWithId("h6", c));
    html = html.replace(/^##### (.*$)/gm, (_m, c) => headingWithId("h5", c));
    html = html.replace(/^#### (.*$)/gm, (_m, c) => headingWithId("h4", c));
    html = html.replace(/^### (.*$)/gm, (_m, c) => headingWithId("h3", c));
    html = html.replace(/^## (.*$)/gm, (_m, c) => headingWithId("h2", c));
    html = html.replace(/^# (.*$)/gm, (_m, c) => headingWithId("h1", c));

    html = this._processBlockLines(html);

    html = html.replace(/^```[\w-]*[ \t]*$/gm, "");

    const linkBlockMap: string[] = [];

    html = html.replace(/`(.*?)`/g, (_m, code) => {
      const placeholder = `@@LINKBLOCK${linkBlockMap.length}@@`;
      linkBlockMap.push(`<code>${code}</code>`);
      return placeholder;
    });

    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_m, alt, src) => {
      const placeholder = `@@LINKBLOCK${linkBlockMap.length}@@`;
      const decodedSrc = src
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"');
      const escapedAlt = alt.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
      linkBlockMap.push(`<img src="${decodedSrc}" alt="${escapedAlt}" style="max-width: 100%; height: auto;" />`);
      return placeholder;
    });

    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text2, url) => {
      const placeholder = `@@LINKBLOCK${linkBlockMap.length}@@`;
      const target = url.includes(":") ? "_blank" : "_self";
      linkBlockMap.push(`<a href="${url}" target="${target}" rel="noopener noreferrer">${text2}</a>`);
      return placeholder;
    });

    html = html.replace(/(?<!href="|href=')(https?:\/\/[^\s<>"']+)/g, (m) => {
      const placeholder = `@@LINKBLOCK${linkBlockMap.length}@@`;
      const target = m.includes(":") ? "_blank" : "_self";
      linkBlockMap.push(`<a href="${m}" target="${target}" rel="noopener noreferrer">${m}</a>`);
      return placeholder;
    });

    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/__(.*?)__/g, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    html = html.replace(/_(.*?)_/g, "<em>$1</em>");

    html = this._finalizeParagraphBlocks(html);

    html = html.replace(/@@MDBLOCK(\d+)@@/g, (_m, index) => extractedBlocks[Number(index)] || "");
    html = html.replace(/@@LINKBLOCK(\d+)@@/g, (_m, index) => linkBlockMap[Number(index)] || "");
    html = html.replace(/@@RAWHTML(\d+)@@/g, (_m, index) => this._sanitizeHtml(rawHtmlBlocks[Number(index)] || ""));

    return html;
  }

  private _processBlockLines(html: string): string {
    const lines = html.split("\n");
    const processedLines: string[] = [];
    let inTable = false;
    let tableRows: string[] = [];
    let inList = false;
    let listItems: string[] = [];
    let inBlockquote = false;
    let blockquoteLines: string[] = [];

    const alertTypes: Record<string, { icon: string; class: string; title: string }> = {
      NOTE: { icon: "i", class: "alert-note", title: "Note" },
      TIP: { icon: "*", class: "alert-tip", title: "Tip" },
      IMPORTANT: { icon: "!", class: "alert-important", title: "Important" },
      WARNING: { icon: "!", class: "alert-warning", title: "Warning" },
      CAUTION: { icon: "x", class: "alert-caution", title: "Caution" },
    };

    const closeBlockquote = () => {
      if (inBlockquote && blockquoteLines.length > 0) {
        const firstLine = blockquoteLines[0];
        const alertMatch = firstLine.match(/^\[!(\w+)\]\s*(.*)?$/);
        if (alertMatch) {
          const alertType = alertMatch[1].toUpperCase();
          const alertConfig = alertTypes[alertType];
          if (alertConfig) {
            const contentLines: string[] = [];
            if (alertMatch[2]) contentLines.push(alertMatch[2]);
            contentLines.push(...blockquoteLines.slice(1));
            const content = contentLines.join("<br>").trim();
            const alertHtml = `<div class="alert ${alertConfig.class}"><div class="alert-header"><span class="alert-icon">${alertConfig.icon}</span> ${alertConfig.title}</div><div class="alert-content">${content}</div></div>`;
            processedLines.push(alertHtml);
          } else {
            processedLines.push(`<blockquote>${blockquoteLines.join("<br>")}</blockquote>`);
          }
        } else {
          processedLines.push(`<blockquote>${blockquoteLines.join("<br>")}</blockquote>`);
        }
      }
      inBlockquote = false;
      blockquoteLines = [];
    };

    for (const line_ of lines) {
      const line = line_.trim();

      if (/^&gt;\s?/.test(line)) {
        if (inList) {
          processedLines.push(`${this.templateUlStart}${listItems.join("")}</ul>`);
          inList = false;
          listItems = [];
        }
        if (inTable) {
          if (tableRows.length > 0)
            processedLines.push(MarkDownRenderer.tableStartTag + tableRows.join("") + MarkDownRenderer.tableEndTag);
          inTable = false;
          tableRows = [];
        }
        inBlockquote = true;
        blockquoteLines.push(line.replace(/^&gt;\s?/, ""));
        continue;
      }

      if (inBlockquote) closeBlockquote();

      if (line.includes("|")) {
        let cellLine = line;
        if (cellLine.startsWith("|")) cellLine = cellLine.slice(1);
        if (cellLine.endsWith("|")) cellLine = cellLine.slice(0, -1);
        const cells = cellLine.split("|").map((c) => c.trim());
        const isHeaderSeparator = cells.length > 0 && cells.every((c) => /^-+$/.test(c));
        const isValidTableRow = isHeaderSeparator || inTable || cells.length > 1;
        if (isValidTableRow) {
          if (inList) {
            processedLines.push(`${this.templateUlStart}${listItems.join("")}</ul>`);
            inList = false;
            listItems = [];
          }
          if (!inTable) {
            inTable = true;
            tableRows = [];
          }
          if (!isHeaderSeparator) {
            const isHeaderRow = tableRows.length === 0;
            const tag = isHeaderRow ? "th" : "td";
            const row = `<tr>${cells
              .map((cell) => `<${tag}>${cell.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</${tag}>`)
              .join("")}</tr>`;
            tableRows.push(row);
          }
          continue;
        }
      }

      if (/^(-{3,}|\*{3,}|_{3,})$/.test(line)) {
        if (inList) {
          processedLines.push(`${this.templateUlStart}${listItems.join("")}</ul>`);
          inList = false;
          listItems = [];
        }
        if (inTable) {
          if (tableRows.length > 0)
            processedLines.push(MarkDownRenderer.tableStartTag + tableRows.join("") + MarkDownRenderer.tableEndTag);
          inTable = false;
          tableRows = [];
        }
        processedLines.push("<hr>");
      } else if (/^[\s]*[-*][\s]+/.test(line) || /^[\s]*\d+\.[\s]+/.test(line)) {
        if (inTable) {
          if (tableRows.length > 0)
            processedLines.push(MarkDownRenderer.tableStartTag + tableRows.join("") + MarkDownRenderer.tableEndTag);
          inTable = false;
          tableRows = [];
        }
        const itemText = line.replace(/^[\s]*[-*\d.]+[\s]+/, "");
        if (!inList) {
          inList = true;
          listItems = [];
        }
        listItems.push(
          `<li style="margin: 0 !important; padding: 0 !important; line-height: 1.2 !important;">${itemText}</li>`,
        );
      } else if (/^<h[1-6]>/.test(line)) {
        if (inList) {
          processedLines.push(`${this.templateUlStart}${listItems.join("")}</ul>`);
          inList = false;
          listItems = [];
        }
        if (inTable) {
          if (tableRows.length > 0)
            processedLines.push(MarkDownRenderer.tableStartTag + tableRows.join("") + MarkDownRenderer.tableEndTag);
          inTable = false;
          tableRows = [];
        }
        processedLines.push(line);
      } else {
        if (inList) {
          processedLines.push(`${this.templateUlStart}${listItems.join("")}</ul>`);
          inList = false;
          listItems = [];
        }
        if (inTable) {
          if (tableRows.length > 0)
            processedLines.push(MarkDownRenderer.tableStartTag + tableRows.join("") + MarkDownRenderer.tableEndTag);
          inTable = false;
          tableRows = [];
        }
        processedLines.push(line || "");
      }
    }

    closeBlockquote();
    if (inList && listItems.length > 0) processedLines.push(`${this.templateUlStart}${listItems.join("")}</ul>`);
    if (inTable && tableRows.length > 0)
      processedLines.push(MarkDownRenderer.tableStartTag + tableRows.join("") + MarkDownRenderer.tableEndTag);

    return processedLines.join("\n");
  }

  splitMermaidSegments(text: string): Segment[] {
    const segments: Segment[] = [];
    const pattern = /^```([\w-]*)[ \t]*\r?\n([\s\S]*?)^```[ \t]*\r?$/gm;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(text)) !== null) {
      const lang = (match[1] || "").trim().toLowerCase();
      const content = match[2];

      if (match.index > lastIndex) {
        const before = text.slice(lastIndex, match.index);
        if (before.trim()) segments.push({ type: "text", content: before });
      }

      switch (lang) {
        case "mermaid":
          segments.push({ type: "mermaid", content: content.trim() });
          break;
        case "svg":
          segments.push({ type: "svg", content: content.trim() });
          break;
        case "canvas":
          segments.push({ type: "canvas", content: content.trim() });
          break;
        default:
          segments.push({ type: "code", content: content, language: lang });
      }
      lastIndex = match.index + match[0].length;
    }

    const remaining = text.slice(lastIndex);
    if (remaining.trim()) segments.push({ type: "text", content: remaining });

    const refined: Segment[] = [];
    for (const seg of segments) {
      if (seg.type === "text") {
        this._splitRawSvgBlocks(seg.content, refined);
      } else {
        refined.push(seg);
      }
    }

    return refined.length > 0 ? refined : [{ type: "text", content: text }];
  }

  private _splitRawSvgBlocks(text: string, out: Segment[]): void {
    const svgPattern = /<svg\b[\s\S]*?<\/svg>/gi;
    let lastIdx = 0;
    let m: RegExpExecArray | null;
    while ((m = svgPattern.exec(text)) !== null) {
      if (m.index > lastIdx) {
        const before = text.slice(lastIdx, m.index);
        if (before.trim()) out.push({ type: "text", content: before });
      }
      out.push({ type: "svg", content: m[0] });
      lastIdx = m.index + m[0].length;
    }
    const rest = text.slice(lastIdx);
    if (rest.trim()) out.push({ type: "text", content: rest });
  }

  private _finalizeParagraphBlocks(html: string): string {
    const standaloneBlocks: string[] = [];
    let paragraphLines: string[] = [];

    const flushParagraph = () => {
      if (paragraphLines.length === 0) return;
      const content = paragraphLines.join("\n").trim();
      if (content) standaloneBlocks.push(`<p>${content}</p>`);
      paragraphLines = [];
    };

    const isStandaloneBlock = (line: string) =>
      /^(@@MDBLOCK\d+@@|@@RAWHTML\d+@@|<(h[1-6]|ul|ol|table|hr|blockquote|div|p|pre)[\s>])/i.test(line);

    for (const rawLine of html.split("\n")) {
      const line = rawLine.trim();
      if (!line) {
        flushParagraph();
        continue;
      }
      if (isStandaloneBlock(line)) {
        flushParagraph();
        standaloneBlocks.push(line);
        continue;
      }
      paragraphLines.push(line);
    }
    flushParagraph();
    return standaloneBlocks.join("\n");
  }

  private _extractRawHtml(text: string, rawHtmlBlocks: string[]): string {
    text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

    const blockTags =
      "address|article|aside|details|dialog|dd|div|dl|dt|fieldset|figcaption|figure|footer|form|header|hgroup|hr|main|nav|ol|pre|section|summary|table|tbody|td|tfoot|th|thead|tr|ul";

    const blockPattern = new RegExp(String.raw`^([ \t]*)<(${blockTags})(\s[^>]*)?>([\s\S]*?)<\/\2>[ \t]*$`, "gmi");
    text = text.replace(blockPattern, (match) => {
      const placeholder = `@@RAWHTML${rawHtmlBlocks.length}@@`;
      rawHtmlBlocks.push(match.trim());
      return `\n${placeholder}\n`;
    });

    const selfClosingBlockPattern = new RegExp(String.raw`^[ \t]*<(${blockTags})(\s[^>]*)?\/?>[ \t]*$`, "gmi");
    text = text.replace(selfClosingBlockPattern, (match) => {
      const placeholder = `@@RAWHTML${rawHtmlBlocks.length}@@`;
      rawHtmlBlocks.push(match.trim());
      return `\n${placeholder}\n`;
    });

    const inlineTags =
      "span|mark|kbd|sup|sub|abbr|ins|del|small|cite|dfn|time|var|samp|q|ruby|rt|rp|bdo|bdi|data|output|meter|progress";
    const inlinePairedPattern = new RegExp(String.raw`<(${inlineTags})(\s[^>]*)?>([\s\S]*?)<\/\1>`, "gi");
    text = text.replace(inlinePairedPattern, (match) => {
      const placeholder = `@@RAWHTML${rawHtmlBlocks.length}@@`;
      rawHtmlBlocks.push(match);
      return placeholder;
    });

    const selfClosingInlinePattern = /<(br|wbr|img|input)(\s[^>]*)?\/?>/gi;
    text = text.replace(selfClosingInlinePattern, (match) => {
      const placeholder = `@@RAWHTML${rawHtmlBlocks.length}@@`;
      rawHtmlBlocks.push(match);
      return placeholder;
    });

    text = text.replace(/<!--[\s\S]*?-->/g, (match) => {
      const placeholder = `@@RAWHTML${rawHtmlBlocks.length}@@`;
      rawHtmlBlocks.push(match);
      return placeholder;
    });

    return text;
  }

  private _sanitizeHtml(html: string): string {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        "div",
        "p",
        "details",
        "summary",
        "figure",
        "figcaption",
        "blockquote",
        "pre",
        "hr",
        "br",
        "wbr",
        "ul",
        "ol",
        "li",
        "dl",
        "dt",
        "dd",
        "table",
        "thead",
        "tbody",
        "tfoot",
        "tr",
        "th",
        "td",
        "caption",
        "colgroup",
        "col",
        "span",
        "mark",
        "kbd",
        "sup",
        "sub",
        "abbr",
        "ins",
        "del",
        "small",
        "cite",
        "dfn",
        "time",
        "var",
        "samp",
        "q",
        "ruby",
        "rt",
        "rp",
        "bdo",
        "bdi",
        "data",
        "output",
        "meter",
        "progress",
        "img",
        "strong",
        "em",
        "b",
        "i",
        "u",
        "s",
        "code",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "section",
        "article",
        "aside",
        "header",
        "footer",
        "nav",
        "main",
        "address",
        "hgroup",
        "picture",
        "source",
        "audio",
        "video",
      ],
      ALLOWED_ATTR: [
        "class",
        "id",
        "style",
        "title",
        "lang",
        "dir",
        "align",
        "valign",
        "colspan",
        "rowspan",
        "scope",
        "headers",
        "width",
        "height",
        "alt",
        "src",
        "srcset",
        "loading",
        "open",
        "datetime",
        "value",
        "min",
        "max",
        "low",
        "high",
        "optimum",
        "start",
        "reversed",
        "type",
        "cite",
        "controls",
        "autoplay",
        "loop",
        "muted",
        "preload",
        "poster",
        "aria-label",
        "aria-describedby",
        "aria-hidden",
        "role",
      ],
      ALLOW_DATA_ATTR: true,
      FORBID_TAGS: [
        "script",
        "iframe",
        "object",
        "embed",
        "form",
        "input",
        "textarea",
        "select",
        "button",
        "link",
        "meta",
        "style",
      ],
      FORBID_ATTR: [
        "onerror",
        "onclick",
        "onload",
        "onmouseover",
        "onfocus",
        "onblur",
        "onchange",
        "onsubmit",
        "onkeydown",
        "onkeyup",
        "onkeypress",
      ],
    });
  }

  parseThinkingBlocks(text: string): ThinkingPart[] {
    const parts: ThinkingPart[] = [];
    let currentIndex = 0;

    while (currentIndex < text.length) {
      const thinkingStart = text.indexOf("<thinking>", currentIndex);
      if (thinkingStart === -1) {
        const remainingText = text.substring(currentIndex).trim();
        if (remainingText) parts.push({ type: "text", content: remainingText });
        break;
      }
      if (thinkingStart > currentIndex) {
        const beforeText = text.substring(currentIndex, thinkingStart).trim();
        if (beforeText) parts.push({ type: "text", content: beforeText });
      }
      const thinkingEnd = text.indexOf("</thinking>", thinkingStart);
      if (thinkingEnd === -1) {
        const thinkingContent = text.substring(thinkingStart + 10);
        if (thinkingContent.trim()) parts.push({ type: "thinking", content: thinkingContent, incomplete: true });
        break;
      } else {
        const thinkingContent = text.substring(thinkingStart + 10, thinkingEnd);
        parts.push({ type: "thinking", content: thinkingContent, incomplete: false });
        currentIndex = thinkingEnd + 11;
      }
    }
    return parts;
  }

  createThinkingBlock(content: string, incomplete = false): HTMLElement {
    const thinkingDiv = document.createElement("div");
    thinkingDiv.className = "thinking-block";

    const header = document.createElement("div");
    header.className = "thinking-header";
    header.innerHTML = `<span>Thinking${incomplete ? "..." : ""}</span><span class="thinking-toggle">v</span>`;

    const contentDiv = document.createElement("div");
    contentDiv.className = "thinking-content collapsed";
    contentDiv.textContent = content;

    header.addEventListener("click", () => {
      const toggle = header.querySelector(".thinking-toggle");
      const isExpanded = contentDiv.classList.contains("expanded");
      if (isExpanded) {
        contentDiv.classList.remove("expanded");
        contentDiv.classList.add("collapsed");
        toggle?.classList.remove("expanded");
      } else {
        contentDiv.classList.remove("collapsed");
        contentDiv.classList.add("expanded");
        toggle?.classList.add("expanded");
      }
    });

    thinkingDiv.append(header);
    thinkingDiv.append(contentDiv);
    return thinkingDiv;
  }

  private _escapeHtml(text: string): string {
    return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  private _escapeAttribute(text: string): string {
    return this._escapeHtml(text).replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  private _buildMermaidBlockHtml(content: string): string {
    return `<div class="mermaid-wrapper"><div class="mermaid" data-diagram="${this._escapeAttribute(content)}"></div></div>`;
  }

  private _buildCodeBlockHtml(content: string, language = ""): string {
    const lang = (language || "").trim();
    const escapedContent = this._escapeHtml(content);
    return `<div class="code-block-wrapper"><div class="code-block-header"><span>${lang || "code"}</span><button class="copy-btn" data-role="copy">Copy</button></div><pre><code class="language-${lang}">${escapedContent}</code></pre></div>`;
  }

  private _renderSvgSegment(messageElement: HTMLElement, seg: Segment): void {
    const wrapper = document.createElement("div");
    wrapper.className = "svg-wrapper";
    const svgContainer = document.createElement("div");
    svgContainer.className = "svg-render-container";
    svgContainer.innerHTML = seg.content;
    wrapper.append(svgContainer);
    wrapper.dataset["originalSvg"] = seg.content;

    const svgEl = svgContainer.querySelector("svg") as SVGSVGElement | null;
    if (svgEl) {
      if (!svgEl.getAttribute("viewBox")) {
        const w = svgEl.getAttribute("width");
        const h = svgEl.getAttribute("height");
        if (w && h) svgEl.setAttribute("viewBox", `0 0 ${Number.parseFloat(w)} ${Number.parseFloat(h)}`);
      }
      svgEl.removeAttribute("width");
      svgEl.removeAttribute("height");
      svgEl.style.width = "100%";
      svgEl.style.height = "auto";
      svgEl.style.maxHeight = "500px";
    }

    messageElement.append(wrapper);
  }

  private _renderCanvasSegment(messageElement: HTMLElement, seg: Segment): void {
    const wrapper = document.createElement("div");
    wrapper.className = "canvas-wrapper";
    const canvasContainer = document.createElement("div");
    canvasContainer.className = "canvas-render-container";
    wrapper.append(canvasContainer);

    const canvas = document.createElement("canvas");
    canvas.className = "pixel-art-canvas";
    canvasContainer.append(canvas);

    try {
      const ctx = canvas.getContext("2d");
      const canvasCode = seg.content;
      // Executing user-supplied canvas code intentionally; the input is expected to
      // be trusted markdown authored by the application, not arbitrary user input.
      const executeCode = new Function("canvas", "ctx", canvasCode);
      executeCode(canvas, ctx);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      canvasContainer.innerHTML = `<div class="mermaid-error">Canvas error: ${message}</div>`;
      console.error("Canvas rendering error:", err);
    }

    messageElement.append(wrapper);
  }

  private _renderCodeSegment(messageElement: HTMLElement, seg: Segment): void {
    const wrapper = document.createElement("div");
    wrapper.className = "code-block-wrapper";
    const lang = seg.language || "";
    wrapper.innerHTML = this._buildCodeBlockHtml(seg.content, lang)
      .replace(/^\s*<div class="code-block-wrapper">/, "")
      .replace(/<\/div>\s*$/, "");
    messageElement.append(wrapper);

    // Wire up the copy button (data-role="copy") without inline handlers.
    const copyBtn = wrapper.querySelector('button[data-role="copy"]') as HTMLButtonElement | null;
    const codeEl = wrapper.querySelector("pre code") as HTMLElement | null;
    if (copyBtn && codeEl) {
      copyBtn.addEventListener("click", () => {
        void navigator.clipboard.writeText(codeEl.textContent || "").then(() => {
          const original = copyBtn.textContent;
          copyBtn.textContent = "Copied";
          setTimeout(() => (copyBtn.textContent = original), 1500);
        });
      });
    }

    if (codeEl) {
      delete codeEl.dataset["highlighted"];
      try {
        hljs.highlightElement(codeEl);
      } catch (err) {
        console.warn("highlight.js failed:", err);
      }
    }
  }

  postProcessMarkdownElement(element: HTMLElement): void {
    const tables = element.querySelectorAll("table");
    for (const table of Array.from(tables)) {
      let wrapper = table.parentElement as HTMLElement | null;
      if (!wrapper || !wrapper.classList.contains("markdown-table-wrapper")) {
        wrapper = document.createElement("div");
        wrapper.className = "markdown-table-wrapper";
        wrapper.style.position = "relative";
        wrapper.style.margin = "1rem 0";
        table.parentNode?.insertBefore(wrapper, table);
        wrapper.append(table);
      }
      table.classList.add("markdown-table");
    }
  }

  generateTocElement(element: HTMLElement, collapsed = false): void {
    if (!element) return;

    const headers = element.querySelectorAll("h1, h2, h3");
    if (headers.length < 2) return;

    const anchors: Array<{ level: number; text: string; id: string }> = [];
    let counter = 0;

    for (const header of Array.from(headers)) {
      const level = Number.parseInt(header.tagName.charAt(1), 10);
      const id = `doc-h-${counter++}`;
      const text = (header.textContent || "").trim();
      header.id = id;
      anchors.push({ level, text, id });
    }

    const items = anchors
      .map((e) => {
        const cls = e.level === 1 ? "toc-l1" : e.level === 2 ? "toc-l2" : "toc-l3";
        const escaped = e.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return `<li class="${cls}"><a href="#${e.id}">${escaped}</a></li>`;
      })
      .join("");

    const tocNav = document.createElement("nav");
    tocNav.className = "doc-toc" + (collapsed ? " doc-toc-collapsed" : "");

    const titleSpan = document.createElement("span");
    titleSpan.className = "doc-toc-title";
    titleSpan.textContent = "Contents";
    titleSpan.addEventListener("click", () => {
      tocNav.classList.toggle("doc-toc-collapsed");
    });

    const ul = document.createElement("ul");
    ul.innerHTML = items;

    tocNav.append(titleSpan);
    tocNav.append(ul);

    element.insertBefore(tocNav, element.firstChild);
  }

  /**
   * Wraps the content following the N-th heading (of a given level) into a
   * collapsible section with a Show more / Show less toggle button.
   *
   * The section spans from the trigger heading up to (but not including) the
   * next heading with a level less than or equal to `headingLevel`, so nested
   * subsections stay inside the collapsible region.
   */
  applyCollapse(element: HTMLElement, options: CollapseOptions = {}): void {
    if (!element) return;

    const headingLevel = Math.min(6, Math.max(1, options.headingLevel ?? 2));
    const fromHeadingIndex = options.fromHeadingIndex ?? 0;
    if (!fromHeadingIndex || fromHeadingIndex < 1) return;

    const showMoreLabel = options.showMoreLabel || "Show more";
    const showLessLabel = options.showLessLabel || "Show less";

    // Bail out if we already applied the collapse in a previous render.
    if (element.querySelector(".nx3-collapse-wrapper")) return;

    // Collect every heading of the target level in document order, but skip
    // anything inside the TOC nav (that is a widget, not part of the flow).
    const targetTag = `H${headingLevel}`;
    const allHeadings: HTMLElement[] = [];
    for (const heading of Array.from(element.querySelectorAll(targetTag)) as HTMLElement[]) {
      if (heading.closest(".doc-toc")) continue;
      allHeadings.push(heading);
    }
    if (allHeadings.length < fromHeadingIndex) return;

    const triggerHeading = allHeadings[fromHeadingIndex - 1];

    // The trigger heading may sit deep inside a nested container (e.g.
    // `<div class="message-text">`). Find the top-level child of its parent
    // that contains (or is) the trigger heading - that is the DOM position
    // where the collapse starts. Content before this boundary stays visible.
    const parent = triggerHeading.parentElement;
    if (!parent) return;

    let triggerBoundary: HTMLElement = triggerHeading;
    while (triggerBoundary.parentElement && triggerBoundary.parentElement !== parent) {
      triggerBoundary = triggerBoundary.parentElement;
    }

    // Collect everything from the trigger boundary onwards inside `parent`.
    const collapsibleNodes: Node[] = [];
    let cursor: Node | null = triggerBoundary;
    while (cursor) {
      const next: Node | null = cursor.nextSibling;
      collapsibleNodes.push(cursor);
      cursor = next;
    }

    // If the trigger sits inside a nested container, also collect every
    // subsequent host-level sibling so the collapse reaches the end of the
    // document.
    const followUpContainers: HTMLElement[] = [];
    if (parent !== element) {
      let sibling: Element | null = parent.nextElementSibling;
      while (sibling) {
        if (sibling instanceof HTMLElement) followUpContainers.push(sibling);
        sibling = sibling.nextElementSibling;
      }
    }

    if (collapsibleNodes.length === 0 && followUpContainers.length === 0) return;

    // Build wrapper + content container + toggle button. The toggle sits
    // ABOVE the content so it replaces the trigger heading visually (which
    // is hidden together with everything else in the collapsed state).
    const wrapper = document.createElement("div");
    wrapper.className = "nx3-collapse-wrapper nx3-collapse-collapsed";

    const content = document.createElement("div");
    content.className = "nx3-collapse-content";

    // Count hidden top-level sections so the toggle can hint at how much is
    // hidden. We count the trigger heading itself plus any other headings of
    // the same level that end up inside the collapse content.
    let hiddenSectionCount = 1;
    const countHeadings = (nodes: Iterable<Node>) => {
      for (const n of nodes) {
        if (n instanceof HTMLElement) {
          for (const h of Array.from(n.querySelectorAll(targetTag)) as HTMLElement[]) {
            if (h !== triggerHeading) hiddenSectionCount++;
          }
        }
      }
    };
    countHeadings(collapsibleNodes);
    countHeadings(followUpContainers);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "nx3-collapse-toggle";
    button.setAttribute("aria-expanded", "false");

    const label = document.createElement("span");
    label.className = "nx3-collapse-toggle-label";

    const labelText = document.createElement("span");
    labelText.className = "nx3-collapse-toggle-text";
    labelText.textContent = showMoreLabel;
    label.append(labelText);

    if (hiddenSectionCount > 1) {
      const hint = document.createElement("span");
      hint.className = "nx3-collapse-toggle-hint";
      hint.textContent = `+${hiddenSectionCount - 1}`;
      label.append(hint);
    }

    const chevron = document.createElement("span");
    chevron.className = "nx3-collapse-toggle-chevron";
    chevron.setAttribute("aria-hidden", "true");
    label.append(chevron);

    button.append(label);

    // Insert the wrapper at the trigger boundary position within its parent.
    // This puts the toggle exactly where the trigger heading used to be.
    parent.insertBefore(wrapper, triggerBoundary);

    // Move all collected nodes into the content.
    for (const node of collapsibleNodes) {
      content.append(node);
    }
    for (const container of followUpContainers) {
      content.append(container);
    }

    // Toggle FIRST, then content: keeps a stable click target on top and
    // lets the content simply appear below it when expanded.
    wrapper.append(button);
    wrapper.append(content);

    button.addEventListener("click", () => {
      const isCollapsed = wrapper.classList.toggle("nx3-collapse-collapsed");
      const expanded = !isCollapsed;
      button.setAttribute("aria-expanded", String(expanded));
      labelText.textContent = expanded ? showLessLabel : showMoreLabel;
    });
  }
}
