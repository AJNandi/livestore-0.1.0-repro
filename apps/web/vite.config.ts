import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { lezer } from "@lezer/generator/rollup"
import { TanStackRouterVite } from "@tanstack/router-vite-plugin"
import path from "path"
import { livestoreDevtoolsPlugin } from "@livestore/devtools-vite"

const isProdBuild = process.env.NODE_ENV === "production"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    livestoreDevtoolsPlugin({ schemaPath: "../../packages/livestore/src/schema.ts" }),
    react(),
    // @ts-expect-error - Vite doesn't have types for this plugin
    lezer(),
    TanStackRouterVite(), // Needed for OPFS Sqlite to work
    {
      name: "configure-response-headers",
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader("Cross-Origin-Opener-Policy", "same-origin")
          res.setHeader("Cross-Origin-Embedder-Policy", "require-corp")
          next()
        })
      },
    },
  ],
  optimizeDeps: {
    exclude: ["@repo/lezer-spreadsheet/src/grammar", "@repo/file-explorer", "@livestore/wa-sqlite"],
  },
  worker: isProdBuild ? { format: "es" } : undefined,
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "sheetgraph", replacement: path.resolve(__dirname, "../../crates/sheetgraph/pkg") },
    ],
  },
})
