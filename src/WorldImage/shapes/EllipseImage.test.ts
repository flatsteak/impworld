import { beforeEach, describe, test } from 'vitest';

import { expectWorldToMatchSnapshot, oneShotTestWorld } from '../../../__tests__/image-handling';

import { EllipseImage, OutlineMode } from '@/WorldImage';
import { Color } from '@/util/Color';

describe('Ellipse', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="world"></div>';
  });

  test('should render in world', () => {
    const ellipse = new EllipseImage(30, 60, OutlineMode.SOLID, Color.RED).movePinhole(-15, -30);
    const { world } = oneShotTestWorld({ image: ellipse, w: 32, h: 62, x: 1, y: 1 });
    expectWorldToMatchSnapshot(world);
  });
});
