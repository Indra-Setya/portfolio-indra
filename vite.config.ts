import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['framer-motion'],
          'three-vendor': ['three'],
          'lenis-vendor': ['lenis'],
        },
      },
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
