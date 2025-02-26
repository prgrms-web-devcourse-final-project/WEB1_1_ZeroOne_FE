import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';
// https://vite.dev/config/
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
      filename: 'stats.html', // 분석 결과 파일 이름
      open: true, // 빌드 후 자동으로 브라우저 열기
      gzipSize: true, // gzip 크기 표시
      brotliSize: true, // brotli 압축 크기 표시
      template: 'treemap', // 시각화 템플릿 (treemap, sunburst, network)
      sourcemap: true, // 소스맵 사용
      // detail: true, // 상세 정보 표시
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
});
