import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // PHASE 1: absolute base. With multiple real routes, relative asset URLs
  // would resolve against each route's directory and break. Production serves
  // the site from the domain root, so '/assets/...' is correct everywhere.
  base: '/',
  // kimi-plugin-inspect-react adds code-path="..." debugging attributes to
  // every element. That is a development aid only: it must never reach
  // production HTML or the SSR prerender output. It runs ONLY for the ordinary
  // local dev server; `vite build` and scripts/prerender.mjs (which sets
  // PRERENDER=1) both get a clean transform pipeline.
  plugins: [
    command === 'serve' && process.env.PRERENDER !== '1' ? inspectAttr() : null,
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
