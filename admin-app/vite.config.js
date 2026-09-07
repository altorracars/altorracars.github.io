import { defineConfig } from 'vite';

// La app se sirve en GitHub Pages bajo una RUTA NUEVA durante el run paralelo
// (`/admin-app/dist/`), sin tocar el sitio público. `base: './'` hace que los
// assets con hash resuelvan relativos al index, sirva donde sirva.
// Cache-busting por hash de Vite → mata el ritual manual CACHE_VERSION (§4) para
// esta app (blueprint §2 / Consejo Externo §15).
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2020',
    sourcemap: false,
    chunkSizeWarningLimit: 900,
  },
  server: {
    port: 5174,
    open: false,
    host: true,
  },
});
