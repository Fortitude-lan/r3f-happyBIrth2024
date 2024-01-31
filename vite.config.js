import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        // svgr options
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${path.resolve(
          __dirname,
          "src/styles.less"
        )}";`,
        javascriptEnabled: true,
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 1234,
    open: true,
  },
});
