import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { ghPages } from "vite-plugin-gh-pages";


export default defineConfig({
  base: "/penumbra-score/",
  plugins: [
    vue(),
    tailwindcss(),
    ghPages(),
  ],
})
