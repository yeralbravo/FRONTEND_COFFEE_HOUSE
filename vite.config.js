import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // asegura la carpeta de build
  },
  server: {
    port: 5173, // puerto por defecto en local
  }
})
