import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // In production nginx proxies /api/* to the callback-bot service (see
    // docker-compose.yml). Locally there's no nginx, so `vite dev` needs
    // its own proxy — otherwise fetch('/api/callback') just 404s against
    // the dev server itself. Run `node server/server.js` (with its .env
    // loaded) alongside `npm run dev` for this to have something to hit.
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
