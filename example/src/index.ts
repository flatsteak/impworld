import { TestWorld } from './TestWorld';
import { RunTests } from './TestCases';

declare global {
  interface Window {
    impworld: {
      TestWorld: typeof TestWorld;
      RunTests: typeof RunTests;
    };
  }
}

window.impworld = {
  TestWorld,
  RunTests,
};
