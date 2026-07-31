import { resolve } from "node:path";
import { defineConfig } from "vite";

// Vite library build.
// Produces:
//   dist/nx3-markdown-renderer.esm.js  (main entry, registers the custom element on import)
//   dist/markdown-renderer-core.js     (framework-agnostic core class, no side effects)
//   dist/nx3-markdown-renderer.css     (compiled styles, also inlined into the shadow root)
//
// Note: mermaid and svg-pan-zoom are NOT bundled. They are loaded at runtime
// from a CDN (jsDelivr by default) via a dynamic `import(url)` whose target
// URL is only known at runtime, so bundlers cannot analyse the reference.
// See `configureExternalLibs()` in the core module for how to override the
// source (e.g. self-hosted mirror, offline environments, strict CSP).
export default defineConfig({
  build: {
    target: "es2020",
    minify: "esbuild",
    sourcemap: true,
    cssCodeSplit: false,
    lib: {
      entry: {
        "nx3-markdown-renderer": resolve(__dirname, "src/markdown-renderer.element.ts"),
        "markdown-renderer-core": resolve(__dirname, "src/markdown-renderer-core.ts"),
      },
      formats: ["es"],
    },
    rollupOptions: {
      // Belt and braces: mark the type-only references as external so that,
      // even if a future refactor introduces a static import, Rollup will
      // not pull them into the bundle. TypeScript still resolves the types
      // from the devDependency install.
      external: ["mermaid", "svg-pan-zoom"],
      output: {
        entryFileNames: (chunk) => (chunk.name === "nx3-markdown-renderer" ? "nx3-markdown-renderer.esm.js" : "[name].js"),
        chunkFileNames: "chunks/[name]-[hash].js",
        assetFileNames: (asset) => {
          if (asset.name && asset.name.endsWith(".css")) {
            return "nx3-markdown-renderer.css";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  server: {
    open: "/demo/index.html",
  },
});
