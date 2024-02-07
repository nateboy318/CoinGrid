import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dotenv from "dotenv";

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = dotenv.config().parsed;

  return {
    plugins: [vue()],
    define: {
      // Make environment variables available during build
      "import.meta.env": JSON.stringify(env),
    },
  };
});
