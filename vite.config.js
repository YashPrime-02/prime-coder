// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // optional, depending on hosting
  build: {
    outDir: 'dist',
  },
  server: {
    historyApiFallback: true, // 👈 this helps local dev sometimes
  }
});
