import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      "/@/": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "/src/scss/_variables.scss";
          @import "/src/scss/styles.scss";
        `,
      },
    },
  },
  build: {
    outDir: "build",
  },
  define: {
    "import.meta.env.VITE_NOROFF_API_KEY": JSON.stringify(process.env.VITE_NOROFF_API_KEY),
  },
});
