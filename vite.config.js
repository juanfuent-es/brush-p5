import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './', // Usar rutas relativas
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        crayon: './crayon.html',
        challenge: './challenge.html',
        circles: './circles.html',
        light: './light.html',
      },
    },
  },
  plugins: [
    tailwindcss()
  ],
});