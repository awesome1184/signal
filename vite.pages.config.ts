import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const root = resolve(process.cwd(), 'src/client');

export default defineConfig({
  root,
  base: '/signal/',
  plugins: [react()],
  build: {
    outDir: resolve(process.cwd(), 'dist/pages'),
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: resolve(root, 'index.html')
    }
  }
});