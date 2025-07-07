import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist' // ensure Vercel uses the correct build output
  },
  server: {
    port: 5173,  // optional: override default port for local dev
    open: true   // optional: auto-open browser
  }
})
