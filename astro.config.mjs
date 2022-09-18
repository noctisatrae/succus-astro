import { defineConfig } from 'astro/config';
import path from "path";
import { fileURLToPath } from 'url';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import solid from "@astrojs/solid-js";
import svelte from "@astrojs/svelte";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), svelte()],
  // vite: {
  //   resolve: {
  //     alias: {
  //       "$": path.resolve(__dirname, "src/components"),
  //       "@": path.resolve(__dirname, "src/layouts"),
  //       "#": path.resolve(__dirname, "src/hooks"),
  //       "&": path.resolve(__dirname, "src/web3"),
  //       "%": path.resolve(__dirname, "src/stores")
  //     }
  //   }
  // }
});