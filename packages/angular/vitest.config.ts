import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [resolve(__dirname, './src/test-setup.ts')],
    exclude: ['**/node_modules/**', '**/dist/**', '**/._**', '**/._*'],
  },
  oxc: {
    decorators: {
      legacy: true,
    },
  },
});
