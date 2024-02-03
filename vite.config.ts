import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { envs } from "./src/core/env";

const baseUrl = envs.VITE_BASE_URL || "/planning-flow";

export default defineConfig({
  root: ".",
  base: baseUrl,
  build: {
    outDir: "build",
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@/mocks": resolve(__dirname, "./src/mocks"),
    },
  },

  plugins: [react()],
});
