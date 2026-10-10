import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const allowedHosts = ['d08c-168-144-93-212.ngrok-free.app']

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { allowedHosts },
  preview: { allowedHosts },
})
