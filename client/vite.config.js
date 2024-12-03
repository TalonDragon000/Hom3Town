import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
    plugins: [vue()],
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                createAvatar: resolve(__dirname, 'create-avatar/index.html')
            }
        }
    },
    server: {
        port: 3001
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    }
});
