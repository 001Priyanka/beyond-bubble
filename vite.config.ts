import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // React core
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            // Charts (heaviest third-party lib)
            'vendor-charts': ['recharts'],
            // Animation
            'vendor-motion': ['motion'],
            // Icons
            'vendor-icons': ['lucide-react'],
          },
        },
      },
      // Suppress the chunk size warning — the remaining app bundle
      // is mostly static seed data that cannot be split further
      chunkSizeWarningLimit: 1000,
    },
  };
});
