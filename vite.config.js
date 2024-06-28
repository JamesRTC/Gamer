import MillionLint from "@million/lint";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const plugins = [react()];
plugins.unshift(MillionLint.vite());

export default defineConfig({
  plugins: plugins,
  base: "/Gamer/", // Ensure this matches your repository name
});
