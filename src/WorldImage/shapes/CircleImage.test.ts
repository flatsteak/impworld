import { beforeEach, describe, expect, test, vi } from 'vitest';
import { Posn } from '@/util/Posn';
import { CircleImage, OutlineMode } from '@/WorldImage';
import { Color } from '@/util/Color';
import { expectWorldToMatchSnapshot, oneShotTestWorld } from '../../../__tests__/image-handling';
import { fakeContext } from '../../../__tests__/fake-context';

describe('Circle', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="world"></div>';
  });

  test.skip('should render', () => {
    const ctx = fakeContext();
    const circle = new CircleImage(10, OutlineMode.SOLID, Color.RED);
    expect(circle.size()).toEqual(new Posn(20, 20));
    circle.preRender(ctx);
    let rendered = circle.render(ctx, Posn.origin);
    expect(rendered.position()).toEqual({ x: 0, y: 0 });

    const moved = circle.movePinhole(5, 5);
    moved.preRender(ctx);
    rendered = moved.render(ctx, Posn.origin);
    expect(rendered.position()).toEqual({ x: 5, y: 5 });
  });

  test('should render in world', () => {
    // Radius is 100, so would be centered at (0, 0) by default, moving the pinhole
    // should get it to (100, 100) which would mean the whole circle is in the image,
    // and a stage size of 202, 202 means it should be centered as well
    const circle = new CircleImage(100, OutlineMode.SOLID, Color.RED).movePinhole(-100, -100);
    const { world } = oneShotTestWorld({ image: circle, w: 202, h: 202, x: 1, y: 1 });
    expectWorldToMatchSnapshot(world);
  });
});
