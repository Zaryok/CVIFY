import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    // Make sure these dependencies are properly processed 
    include: [
      '@react-pdf/renderer',
      'react-pdf'
    ],
  },
  build: {
    rollupOptions: {
      // Exclude problematic modules from bundling
      external: ['next-themes/dist/index.module.js'],
      output: {
        // Handle excluded modules
        globals: {
          'next-themes/dist/index.module.js': 'nextThemes'
        },
        manualChunks: {
          // Move PDF libraries to their own chunk to improve loading performance
          'pdf-lib': ['@react-pdf/renderer', 'react-pdf']
        }
      }
    },
    // Ensure assets are correctly referenced
    assetsDir: 'assets',
    outDir: 'dist',
    // Improve compatibility with older browsers if needed
    target: 'es2015',
    // Ensure sourcemaps are generated for easier debugging
    sourcemap: true,
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
  },
  // Configure proper handling of worker files
  worker: {
    format: 'es'
  }
}); 