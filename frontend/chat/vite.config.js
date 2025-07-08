import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/ksdsld
// This is a Vite configuration file for a React project.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
