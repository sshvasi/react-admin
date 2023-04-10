import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true
    },
    host: true,
    strictPort: true,
    port: 7777
  },
  plugins: [react()]
});
