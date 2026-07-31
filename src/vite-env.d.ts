// Vite-specific module declarations. Enables importing CSS files as strings
// via the `?inline` suffix, which is required by src/styles/index.ts.
declare module '*.css?inline' {
  const content: string;
  export default content;
}
