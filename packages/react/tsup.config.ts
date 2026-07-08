import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'Button/index': 'src/Button/index.ts',
    'Tooltip/index': 'src/Tooltip/index.ts',
    'Toast/index': 'src/Toast/index.ts',
    'Skeleton/index': 'src/Skeleton/index.ts',
    'ProgressBar/index': 'src/ProgressBar/index.ts',
    'Breadcrumb/index': 'src/Breadcrumb/index.ts',
    'Tabs/index': 'src/Tabs/index.ts',
    'Badge/index': 'src/Badge/index.ts',
    'Alert/index': 'src/Alert/index.ts',
    'Avatar/index': 'src/Avatar/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ['react', 'react-dom'],
});
