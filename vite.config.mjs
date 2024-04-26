import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
        listing: path.resolve(__dirname, "src/html/listing/index.html"),
        listings: path.resolve(__dirname, "src/html/listings/index.html"),
        profile: path.resolve(__dirname, "src/html/profile/index.html"),
      },
    },
  },
  server: {
    port: 8080,
    hot: true,
  },
});
