import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // MIXBUS no usa el puerto por defecto de Vite (5173); solo este puerto.
    port: 5180,
    strictPort: true,
  },
})
