import { SpyInstance, expect, vi } from 'vitest';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { World } from '@/World';
import { OutlineMode, RectangleImage, WorldImage } from '@/WorldImage';
import { Color } from '@/util';

declare module 'vitest' {
  interface Assertion<T> {
    toMatchImageSnapshot(): T;
  }
}

expect.extend({ toMatchImageSnapshot });

export function expectImageToMatchSnapshot(image: Buffer) {
  expect(image).toMatchImageSnapshot();
}

export abstract class WorldWithCanvas extends World {
  getCanvas() {
    return this.stage!.toCanvas();
  }
}

export function oneShotTestWorld({
  image,
  x = 0,
  y = 0,
  w = 100,
  h = 100,
}: {
  image: WorldImage | (() => WorldImage);
  x?: number;
  y?: number;
  w?: number;
  h?: number;
}): {
  world: WorldWithCanvas;
  renderSpy: SpyInstance<Parameters<WorldImage['render']>>;
} {
  const renderedImage = typeof image === 'function' ? image() : image;
  class OneShotWorld extends WorldWithCanvas {
    makeScene() {
      const s = this.getEmptyScene();
      s.placeImageXY(new RectangleImage(w, h, OutlineMode.SOLID, Color.WHITE), w / 2, h / 2);
      s.placeImageXY(renderedImage, x, y);
      return s;
    }
  }
  const preRenderSpy = vi.spyOn(renderedImage, 'preRender');
  const renderSpy = vi.spyOn(renderedImage, 'render');
  const world = new OneShotWorld();
  world.bigBang(w, h);
  expect(renderSpy).toHaveBeenCalledOnce();
  expect(preRenderSpy).toHaveBeenCalledOnce();
  return { world, renderSpy };
}

export function expectWorldToMatchSnapshot(world: WorldWithCanvas) {
  const buffer = world.getCanvas().toDataURL();
  const image = Buffer.from(buffer.split(',')[1], 'base64');
  expectImageToMatchSnapshot(image);
}
