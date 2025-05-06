import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/brush-p5', // Usar rutas relativas
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        crayon: './crayon.html',
        draw_drop: './draw-drop.html',
        circles: './circles.html',
        light: './light.html',
      },
    },
  },
  plugins: [
    tailwindcss()
  ],
});