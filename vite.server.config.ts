import { builtinModules } from 'node:module';
import { defineConfig } from 'vite';

export default defineConfig({
  ssr: { noExternal: true },
  build: {
    ssr: 'src/server/index.ts',
    outDir: 'dist/server',
    target: 'node22',
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      external: [...builtinModules, ...builtinModules.map((name) => 'node:' + name)],
      output: {
        format: 'cjs',
        entryFileNames: 'index.cjs',
        inlineDynamicImports: true
      }
    }
  }
});