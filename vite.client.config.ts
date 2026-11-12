import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const root = resolve(process.cwd(), 'src/client');

export default defineConfig({
  root,
  plugins: [react()],
  build: {
    outDir: resolve(process.cwd(), 'dist/client'),
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        splash: resolve(root, 'splash.html'),
        game: resolve(root, 'index.html')
      }
    }
  }
});