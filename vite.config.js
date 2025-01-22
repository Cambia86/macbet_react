import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:"/macbet_react"
  // build: {
  //   outDir: "build"
  // },
  // server: {
  //   host:"0.0.0.0",
  //   port:3500,
  //   strictPort: true,
  //   hmr: {
  //     clientPort: 443 // Run the websocket server on the SSL port
  //   }
  // }
});
