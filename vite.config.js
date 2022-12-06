import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@honkhonk/vite-plugin-svgr';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [svgr(), react(), viteCompression()],
  publicDir: 'public',
  base: './',
  build: {
    outDir: 'build',
    commonjsOptions: { include: [] },
    minify: true
  },
  optimizeDeps: {
    disabled: false
  },
  resolve: {
    alias: [
      {
        find: 'web3',
        replacement: 'web3/dist/web3.min.js',
        process: 'process/browser',
        stream: 'stream-browserify',
        zlib: 'browserify-zlib',
        util: 'util'
      }
    ]
  }
});
