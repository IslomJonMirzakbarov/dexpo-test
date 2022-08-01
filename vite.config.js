import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import svgr from "@honkhonk/vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  publicDir: "public",
  build: {
    outDir: "build",
  },
  resolve: {
    alias: [
      {
        find: "web3",
        replacement: "web3/dist/web3.min.js",
        process: "process/browser",
        stream: "stream-browserify",
        zlib: "browserify-zlib",
        util: "util",
      },
    ],
  }
});
