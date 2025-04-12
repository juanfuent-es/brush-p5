import { defineConfig } from 'vite';

export default defineConfig({
  base: '', // Usar rutas relativas
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        crayon: './crayon.html',
        circles: './circles.html',
        light: './light.html',
      },
    },
  },
});