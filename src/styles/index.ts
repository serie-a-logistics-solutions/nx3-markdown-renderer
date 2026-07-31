// Vite `?inline` imports resolve the referenced files at build time and return
// their content as a plain string. That way the same CSS can be injected into
// the shadow root of the custom element AND emitted as a standalone .css asset.
import hljsTheme from './hljs-theme.css?inline';
import rendererStyles from './renderer.css?inline';

export const bundledStyles = `${hljsTheme}\n${rendererStyles}`;
