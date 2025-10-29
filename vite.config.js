// vite.config.js in the Clarity Coach App project (Repo B)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Change from '/apps/clarity/' to './' (relative path)
  base: './', 
})