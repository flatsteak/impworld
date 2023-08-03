import { beforeEach, describe, test } from 'vitest';

import { expectWorldToMatchSnapshot, oneShotTestWorld } from '../../../__tests__/image-handling';

import {
  AboveImage,
  BesideImage,
  EllipseImage,
  OutlineMode,
  OverlayImage,
  RectangleImage,
} from '@/WorldImage';
import { Color } from '@/util';

describe('OverlayOffsetAlignBase', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="world"></div>';
  });

  test('BesideImage single image', () => {
    const beside = new BesideImage(
      new RectangleImage(100, 100, OutlineMode.SOLID, Color.RED),
    ).movePinhole(-55, -55);
    const { world } = oneShotTestWorld({ image: beside, w: 110, h: 110 });
    expectWorldToMatchSnapshot(world);
  });

  test('AboveImage single image', () => {
    const beside = new AboveImage(
      new RectangleImage(100, 100, OutlineMode.SOLID, Color.RED),
    ).movePinhole(-55, -55);
    const { world } = oneShotTestWorld({ image: beside, w: 110, h: 110 });
    expectWorldToMatchSnapshot(world);
  });

  test('Overlay two images', () => {
    const overlay = new OverlayImage(
      new RectangleImage(30, 60, OutlineMode.SOLID, Color.GREEN),
      new EllipseImage(60, 30, OutlineMode.SOLID, Color.RED),
    ).movePinhole(-40, -40);
    const { world } = oneShotTestWorld({ image: overlay, w: 80, h: 80 });
    expectWorldToMatchSnapshot(world);
  });

  test('Beside two images', () => {
    const r1 = new RectangleImage(50, 50, OutlineMode.SOLID, Color.RED);
    const r2 = new RectangleImage(50, 50, OutlineMode.SOLID, Color.GREEN);
    const r3 = new RectangleImage(50, 50, OutlineMode.SOLID, Color.BLUE);
    const beside = new BesideImage(r1, r2, r3).movePinhole(-80, -30);
    const { world } = oneShotTestWorld({ image: beside, w: 160, h: 60 });
    expectWorldToMatchSnapshot(world);
  });
});
