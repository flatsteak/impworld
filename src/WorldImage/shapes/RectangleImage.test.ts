import { beforeEach, describe, expect, test } from 'vitest';
import { Posn } from '@/util/Posn';
import { Color } from '@/util/Color';
import { OutlineMode, RectangleImage } from '@/WorldImage';
import { expectWorldToMatchSnapshot, oneShotTestWorld } from '../../../__tests__/image-handling';
import { BBox } from '@/util/BBox';

describe('Rectangle', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="world"></div>';
  });

  test('should render in world', () => {
    // Radius is 100, so would be centered at (0, 0) by default, moving the pinhole
    // should get it to (100, 100) which would mean the whole circle is in the image,
    // and a stage size of 202, 202 means it should be centered as well
    const rect = new RectangleImage(100, 50, OutlineMode.SOLID, Color.RED).movePinhole(-50, -25);
    expect(rect.size()).toEqual(new Posn(100, 50));
    expect(rect.bbox().equals(new BBox(new Posn(0, 0), new Posn(100, 50)))).toBeTruthy();
    const { world } = oneShotTestWorld({ image: rect, w: 102, h: 52, x: 1, y: 1 });
    expectWorldToMatchSnapshot(world);
  });
});
