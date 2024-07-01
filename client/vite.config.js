import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://gut-to-know-game-backend.onrender.com',
        secure: false,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/api'),
      }
    },
  },
  plugins: [react()],
})
