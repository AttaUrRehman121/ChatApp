import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/ksdsld
// This is a Vite configuration file for a React project.
// It sets up the project to use React with SWC for faster builds and includes a base
export default defineConfig({
  plugins: [react()],
  base: '/',
})
