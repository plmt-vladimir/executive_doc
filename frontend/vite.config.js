import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true, // позволяет принимать внешние подключения
    port: 5173, // необязательно, но полезно указать явно
    allowedHosts: ['.loca.lt'], // разрешаем туннели localtunnel
  },
});