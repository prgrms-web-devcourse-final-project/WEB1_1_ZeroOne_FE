import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  plugins: [react(), tsconfigPaths(), svgr()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: (content, filePath) => {
          if (filePath.includes('/app/styles/')) {
            return content;
          }

          return `@use "@/app/styles/variables.scss" as *; ${content}`;
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    global: 'window',
  },
});
