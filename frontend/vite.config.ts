import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(), // Enables React Fast Refresh and JSX support
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'), // Alias for easier imports
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`, // Auto import common SCSS variables or mixins
        },
      },
    },
    build: {
      outDir: 'dist', // Output directory for the build
      sourcemap: env.VITE_SOURCE_MAP === 'true', // Generate sourcemaps only if enabled in the environment
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Split large node_modules into separate chunks for better caching
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
        },
      },
    },
    server: {
      port: parseInt(env.VITE_PORT) || 5000, // Use environment variable for the port, fallback to 3000
      open: true, // Automatically open the browser on server start
      proxy: {
        // Proxy API requests to the backend server in development
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    define: {
      'process.env': env, // Pass environment variables to the client-side code
    },
  };
});
