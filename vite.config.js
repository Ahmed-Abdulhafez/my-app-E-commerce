import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // base: "/Food-App-front/",   // 👈 خليه كده مع / في الآخر
  plugins: [
    react(),
    tailwindcss()
  ],
})
