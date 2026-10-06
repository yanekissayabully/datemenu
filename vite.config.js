import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' keeps asset paths valid under any GitHub Pages repo name
export default defineConfig({ base: './', plugins: [react()] })
