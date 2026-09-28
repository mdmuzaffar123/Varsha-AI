import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Ensure only one copy of React is bundled (fixes react-leaflet hook error)
    dedupe: ['react', 'react-dom'],
    alias: {
      react:     path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
  optimizeDeps: {
    include: ['leaflet', 'react-leaflet'],
  },
})
