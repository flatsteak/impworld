import { defineConfig } from 'tsup';

export default defineConfig({
  platform: 'browser',
  format: 'iife',
  tsconfig: 'tsconfig.build.json',
});
