import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages deploy'inant į repo sub-path, base turi sutapti su repo pavadinimu.
  // Jei keisite repo pavadinimą, atnaujinkite šią reikšmę.
  base: process.env.NODE_ENV === 'production' ? '/politika/' : '/',
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    cssCodeSplit: true, // Enable CSS code splitting
    minify: 'esbuild', // Use esbuild (faster, already included)
    cssMinify: true, // Minify CSS
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        },
        // Optimize chunk size
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      }
    }
  }
})
