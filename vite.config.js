import {fileURLToPath, URL} from 'node:url';
import {compression, defineAlgorithm} from 'vite-plugin-compression2';
import Components from 'unplugin-vue-components/vite';
import {PrimeVueResolver} from '@primevue/auto-import-resolver';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  root: './',
  publicDir: 'static-assets',
  build: {
    outDir: 'public',
    sourcemap: 'true',
    emptyOutDir: true,
  },
  plugins: [
    vue(),
    compression({
      algorithms: [
        'gzip',
        'brotliCompress',
        defineAlgorithm('deflate', {level: 9})
      ],
    }),
    Components({
      resolvers: [
        PrimeVueResolver()
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@app': fileURLToPath(new URL('./src/modules/app', import.meta.url)),
      '@admin': fileURLToPath(new URL('./src/modules/admin', import.meta.url))
    }
  }
});
