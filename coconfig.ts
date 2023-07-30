import { config } from '@openapi-typescript-infra/coconfig';

config['tsconfig.json'].configuration.compilerOptions.incremental = false;
config['tsconfig.json'].configuration.include.push('tsup.config.ts');
config['tsconfig.build.json'].configuration.exclude.push('tsup.config.ts');

const baseViTest = config['vitest.config.ts']?.configuration as () => any;
config['vitest.config.ts']!.configuration = () => {
  const vi = baseViTest();
  Object.assign(vi.test, {
    environment: 'jsdom',
    deps: {
      inline: ['vitest-canvas-mock'],
    },
    threads: false,
  });
  return vi;
};

// eslint-disable-next-line import/no-default-export
export default config;
