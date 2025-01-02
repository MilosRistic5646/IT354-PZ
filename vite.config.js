import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // URL JSON servera
        changeOrigin: true, // Podešava Origin header za usklađivanje sa ciljnim serverom
        rewrite: (path) => path.replace(/^\/api/, ''), // Uklanja "/api" prefiks iz URL-a
      },
    },
  },
});
