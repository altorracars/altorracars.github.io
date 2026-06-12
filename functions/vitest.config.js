import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.js', 'shared/**/*.test.js'],
    // §187: 19 archivos en paralelo contra UN emulador — las transacciones
    // bajo contención superan los 5s default y daban falsos timeouts.
    testTimeout: 20000,
    hookTimeout: 30000,
  },
});
