# nx3-markdown-renderer

Framework-agnostic Web Component (`<nx3-markdown-renderer>`) that renders
Markdown, including thinking blocks, fenced code with syntax highlighting,
Mermaid diagrams, inline SVG, canvas snippets, alerts and a table of contents.

## Features

- Single-file custom element with encapsulated styles (Shadow DOM)
- highlight.js, DOMPurify bundled in
- Mermaid and svg-pan-zoom lazy-loaded via dynamic import (~500 KB not paid
  unless a diagram is present)
- Ships as ESM only; targets modern browsers (2020+)

## Install

### Via npm (recommended for bundled apps)

```sh
npm install github:serie-a-logistics-solutions/nx3-markdown-renderer#v0.1.0
```

```ts
import 'nx3-markdown-renderer';

const el = document.createElement('nx3-markdown-renderer');
el.text = '# Hello';
document.body.append(el);
```

### Via CDN (Vanilla JS)

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/gh/serie-a-logistics-solutions/nx3-markdown-renderer@v0.1.0/dist/nx3-markdown-renderer.esm.js"
></script>

<nx3-markdown-renderer text="# Hello **world**"></nx3-markdown-renderer>
```

### Angular integration

```ts
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import 'nx3-markdown-renderer';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // ...
})
export class AppModule {}
```

```html
<nx3-markdown-renderer [attr.text]="markdown"></nx3-markdown-renderer>
```

For long or multiline content, prefer property binding via `@ViewChild`:

```ts
@ViewChild('renderer') rendererRef!: ElementRef<HTMLElement & { text: string }>;

update() {
  this.rendererRef.nativeElement.text = this.markdown;
}
```

## Attributes

| Attribute                     | Type    | Default | Description                                     |
| ----------------------------- | ------- | ------- | ----------------------------------------------- |
| `text`                        | string  | `''`    | Markdown source.                                |
| `anchors`                     | boolean | `true`  | Show heading anchor links.                      |
| `toc`                         | boolean | `false` | Render a table of contents from h1-h3.          |
| `toc-collapsed`               | boolean | `false` | Start the TOC collapsed.                        |
| `collapse-heading-level`      | number  | `2`     | Heading level considered for the collapse hook. |
| `collapse-from-heading-index` | number  | `0`     | Collapse from N-th heading (0 disables).        |
| `collapse-show-more-label`    | string  | -       | Custom label for the collapsed state.           |
| `collapse-show-less-label`    | string  | -       | Custom label for the expanded state.            |

### Collapse hook

Set `collapse-from-heading-index` to a value >= 1 to hide everything from the
N-th heading (of `collapse-heading-level`) onward behind a "Show more" toggle.
Nested subsections stay inside the collapsed region until a heading of the
same or higher level is encountered.

```html
<nx3-markdown-renderer
  text="# Doc..."
  collapse-heading-level="2"
  collapse-from-heading-index="3"
  collapse-show-more-label="Show more"
  collapse-show-less-label="Show less"
></nx3-markdown-renderer>
```

## Development

```sh
npm install
npm run dev       # opens demo/index.html
npm run build     # produces dist/
```

The build emits:

- `dist/nx3-markdown-renderer.esm.js` - main entry, registers the custom element.
- `dist/markdown-renderer-core.js` - framework-agnostic parser without the element registration.
- `dist/nx3-markdown-renderer.css` - the styles as a standalone file (already inlined into the shadow root).
- `dist/chunks/*` - lazy-loaded chunks for mermaid and svg-pan-zoom.
- `dist/*.d.ts` - TypeScript declarations.

## Release

Push a tag `vX.Y.Z`. The `Build and release` workflow builds the library and
attaches `dist/` to a matching GitHub release. jsDelivr resolves `@vX.Y.Z`
tags directly, so no npm publish is required for CDN consumers.

## License

MIT
