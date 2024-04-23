import { defineConfig } from "vite";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  define: {
    "import.meta.env.VITE_NOROFF_API_KEY": JSON.stringify(process.env.VITE_NOROFF_API_KEY),
  },
});
