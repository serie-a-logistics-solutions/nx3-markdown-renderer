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
/**
 * URLs used to load the optional external libraries at runtime. Defaults
 * point to jsDelivr's ESM CDN so consumers never bundle these libs into
 * their own build. Override via `configureExternalLibs()` for offline/CSP
 * scenarios or to pin exact versions.
 */
export interface ExternalLibSources {
    mermaid?: string;
    svgPanZoom?: string;
}
/**
 * Overrides the URLs used to fetch the optional Mermaid and svg-pan-zoom
 * bundles. Call this once, before rendering any Mermaid diagram, to point
 * the loader at a self-hosted mirror or a specific version.
 */
export declare function configureExternalLibs(sources: ExternalLibSources): void;
export declare class MarkDownRenderer {
    static tableStartTag: string;
    static tableEndTag: string;
    templateUlStart: string;
    private mermaidResizeObservers;
    private mermaidRenderCache;
    private _mermaidRenderPromises;
    private anchors;
    constructor(options?: MarkDownRendererOptions);
    updateMessageWithThinking(messageElement: HTMLElement, text: string): void;
    highlightCodeBlocks(container: HTMLElement): void;
    renderMermaidDiagrams(container: HTMLElement): Promise<void>;
    private _ensureMermaidRendered;
    private _buildMermaidUI;
    private _downloadSvgAsPng;
    private _setupMermaidAutoFit;
    private _setupResizeHandle;
    parseMarkdown(text: string): string;
    private _processBlockLines;
    splitMermaidSegments(text: string): Segment[];
    private _splitRawSvgBlocks;
    private _finalizeParagraphBlocks;
    private _extractRawHtml;
    private _sanitizeHtml;
    parseThinkingBlocks(text: string): ThinkingPart[];
    createThinkingBlock(content: string, incomplete?: boolean): HTMLElement;
    private _escapeHtml;
    private _escapeAttribute;
    private _buildMermaidBlockHtml;
    private _buildCodeBlockHtml;
    private _renderSvgSegment;
    private _renderCanvasSegment;
    private _renderCodeSegment;
    postProcessMarkdownElement(element: HTMLElement): void;
    generateTocElement(element: HTMLElement, collapsed?: boolean): void;
    /**
     * Wraps the content following the N-th heading (of a given level) into a
     * collapsible section with a Show more / Show less toggle button.
     *
     * The section spans from the trigger heading up to (but not including) the
     * next heading with a level less than or equal to `headingLevel`, so nested
     * subsections stay inside the collapsible region.
     */
    applyCollapse(element: HTMLElement, options?: CollapseOptions): void;
}
export {};
//# sourceMappingURL=markdown-renderer-core.d.ts.map