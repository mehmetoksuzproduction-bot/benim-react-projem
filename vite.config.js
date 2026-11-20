import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 127.0.0.1: bazı Windows tarayıcıları "localhost"u bu adrese çözer; sunucu yalnızca IPv6'da dinlerse sayfa açılmaz.
  server: { host: '127.0.0.1', port: 5173, open: true },
  preview: { host: '127.0.0.1' },
})
