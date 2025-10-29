// vite.config.js in the Clarity Coach App project (Repo B)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Set the absolute path for asset resolution 
  base: '/apps/clarity/', 
})