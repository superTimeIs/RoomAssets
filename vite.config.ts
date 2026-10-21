import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'node:path'

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  server: {
    host: true, // слушать всех
    port: 5173,
    strictPort: true, // не менять порт
    watch: {
      usePolling: true, // нужно для Windows
    },
  },
})
