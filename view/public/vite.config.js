import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist', // Carpeta de salida para los archivos de construcción
    assetsDir: 'assets', // Carpeta donde se colocarán los activos (por ejemplo, imágenes)
    minify: 'terser', // Opciones de minificación (puedes cambiarlo según tus necesidades)
  },
  server: {
    port: 3000, // Puerto en el que se ejecutará el servidor de desarrollo
  },
});