import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path'; // path 모듈에서 resolve를 임포트
export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      manifest: {
        name: 'ㅇㅗㅅ',
        short_name: 'ReactApp',
        description: 'My React application with PWA support',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  build: {
    outDir: 'dist',
  },
  server: { port: 3000 },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // '@'를 'src' 디렉토리로 설정
    },
  },
});
