import { defineConfig } from 'tsup';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  platform: 'browser',
  format: 'cjs',
  tsconfig: 'tsconfig.build.json',
  dts: true,
});
