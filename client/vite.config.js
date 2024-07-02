import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,

    proxy: {
      '/api': {
        target: 'https://gut-to-know-game-backend.onrender.com',
        changeOrigin: true,
        secure: true,
      }
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    },
  },
  plugins: [react()]
})
