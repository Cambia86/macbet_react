import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
    base: "./"
  },
  server: {
    host: "0.0.0.0",
    port: 3500,
    strictPort: true,
    hmr: {
      overlay: false
      // clientPort: 443 // Run the websocket server on the SSL port
    }
  }
});
