import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';
export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    visualizer({

      filename: './dist/stats.html',
      gzipSize: true, // gzip 크기 표시
      brotliSize: true, // brotli 압축 크기 표시
      template: 'treemap', // 시각화 템플릿 (treemap, sunburst, network)
      sourcemap: true, // 소스맵 사용
      open: true, // 빌드 후 자동으로 브라우저 열기

    }),
  ],
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
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('node_modules/@codemirror') ||
            id.includes('node_modules/@lezer') ||
            id.includes('node_modules/@uiw')
          ) {
            return 'editor';
          }

          if (
            id.includes('highlight.js/lib/languages/') ||
            id.includes('highlight.js/es/languages/')
          ) {
            const lang = id.split('/').pop()?.replaceAll('.js', '');
            return `hljs-${lang}`; // 개별 청크 생성
          }

          if (id.includes('node_modules/marked') || id.includes('node_modules/highlight.js')) {
            return 'preview';
          }

          if (
            id.includes('node_modules/react-slick') ||
            id.includes('node_modules/react-select') ||
            id.includes('node_modules/slick-carousel') ||
            id.includes('node_modules/react-datepicker') ||
            id.includes('node_modules/sweetalert2') ||
            id.includes('node_modules/date-fns')
          ) {
            return 'ui';
          }

          if (id.includes('node_modules/@nivo') || id.includes('node_modules/d3')) {
            return 'chart';
          }

          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
