import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// Vite library build.
// Produces:
//   dist/nx3-markdown-renderer.esm.js  (main entry, registers the custom element on import)
//   dist/markdown-renderer-core.js     (framework-agnostic core class, no side effects)
//   dist/chunks/*.js                   (dynamically imported chunks for mermaid, svg-pan-zoom)
//   dist/nx3-markdown-renderer.css     (compiled styles, also inlined into the shadow root)
export default defineConfig({
  build: {
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: true,
    cssCodeSplit: false,
    lib: {
      entry: {
        'nx3-markdown-renderer': resolve(__dirname, 'src/markdown-renderer.element.ts'),
        'markdown-renderer-core': resolve(__dirname, 'src/markdown-renderer-core.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        entryFileNames: (chunk) => (chunk.name === 'nx3-markdown-renderer' ? 'nx3-markdown-renderer.esm.js' : '[name].js'),
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: (asset) => {
          if (asset.name && asset.name.endsWith('.css')) {
            return 'nx3-markdown-renderer.css';
          }
          return 'assets/[name]-[hash][extname]';
        },
        // Manual chunking keeps mermaid and svg-pan-zoom out of the main bundle.
        manualChunks(id) {
          if (id.includes('node_modules/mermaid')) return 'mermaid';
          if (id.includes('node_modules/svg-pan-zoom')) return 'svg-pan-zoom';
          return undefined;
        },
      },
    },
  },
  server: {
    open: '/demo/index.html',
  },
});
