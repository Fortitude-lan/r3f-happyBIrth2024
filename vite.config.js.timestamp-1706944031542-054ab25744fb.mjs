// vite.config.js
import { defineConfig } from "file:///E:/projects/3D-web/r3f-vite-happyBIrth2024/node_modules/vite/dist/node/index.js";
import react from "file:///E:/projects/3D-web/r3f-vite-happyBIrth2024/node_modules/@vitejs/plugin-react/dist/index.mjs";
import svgr from "file:///E:/projects/3D-web/r3f-vite-happyBIrth2024/node_modules/vite-plugin-svgr/dist/index.js";
import path from "path";
var __vite_injected_original_dirname = "E:\\projects\\3D-web\\r3f-vite-happyBIrth2024";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        // svgr options
      }
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${path.resolve(
          __vite_injected_original_dirname,
          "src/styles.less"
        )}";`,
        javascriptEnabled: true
      }
    }
  },
  server: {
    host: "0.0.0.0",
    port: 1234,
    open: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxwcm9qZWN0c1xcXFwzRC13ZWJcXFxccjNmLXZpdGUtaGFwcHlCSXJ0aDIwMjRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXHByb2plY3RzXFxcXDNELXdlYlxcXFxyM2Ytdml0ZS1oYXBweUJJcnRoMjAyNFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovcHJvamVjdHMvM0Qtd2ViL3IzZi12aXRlLWhhcHB5QklydGgyMDI0L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCBzdmdyIGZyb20gXCJ2aXRlLXBsdWdpbi1zdmdyXCI7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBzdmdyKHtcbiAgICAgIHN2Z3JPcHRpb25zOiB7XG4gICAgICAgIC8vIHN2Z3Igb3B0aW9uc1xuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgY3NzOiB7XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgbGVzczoge1xuICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCIke3BhdGgucmVzb2x2ZShcbiAgICAgICAgICBfX2Rpcm5hbWUsXG4gICAgICAgICAgXCJzcmMvc3R5bGVzLmxlc3NcIlxuICAgICAgICApfVwiO2AsXG4gICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiBcIjAuMC4wLjBcIixcbiAgICBwb3J0OiAxMjM0LFxuICAgIG9wZW46IHRydWUsXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1QsU0FBUyxvQkFBb0I7QUFDclYsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFVBQVU7QUFIakIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLE1BQ0gsYUFBYTtBQUFBO0FBQUEsTUFFYjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLGdCQUFnQixZQUFZLEtBQUs7QUFBQSxVQUMvQjtBQUFBLFVBQ0E7QUFBQSxRQUNGLENBQUM7QUFBQSxRQUNELG1CQUFtQjtBQUFBLE1BQ3JCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
