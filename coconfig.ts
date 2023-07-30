import { config } from '@openapi-typescript-infra/coconfig';

config['tsconfig.json'].configuration.compilerOptions.incremental = false;
config['tsconfig.json'].configuration.include.push('tsup.config.ts');
config['tsconfig.build.json'].configuration.exclude.push('tsup.config.ts');

// eslint-disable-next-line import/no-default-export
export default config;
