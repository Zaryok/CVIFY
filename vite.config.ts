import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      external: ['@react-pdf/renderer'],
    },
    // Ensure assets are correctly referenced
    assetsDir: 'assets',
    outDir: 'dist',
    // Improve compatibility with older browsers if needed
    target: 'es2015'
  },
  // Add base path configuration for deployment flexibility
  base: '/',
  // Ensure proper resolution of assets and imports
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // Configure server options
  server: {
    // Avoid port conflicts
    port: 5173,
    // Allow access from other devices
    host: true,
    // Prevent CORS issues during development
    cors: true
  }
}); 