import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; // If using Vue

export default defineConfig({
    plugins: [vue()], // Include this if using Vue
    server: {
        port: 3001, // Change this if you want a different port for the Vite dev server
        // https: true // Enable HTTPS for the Vite dev server
    },
});