import { beforeEach, describe, expect, test, vi } from 'vitest';
import { Posn } from '@/util/Posn';
import { CircleImage, EllipseImage, OutlineMode } from '@/WorldImage';
import { Color } from '@/util/Color';
import { expectWorldToMatchSnapshot, oneShotTestWorld } from '../../../__tests__/image-handling';
import { fakeContext } from '../../../__tests__/fake-context';

describe('Ellipse', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="world"></div>';
  });

  test.skip('should render', () => {
    const ctx = fakeContext();
    const ellipse = new EllipseImage(30, 60, OutlineMode.SOLID, Color.RED);
    expect(ellipse.size()).toEqual(new Posn(30, 60));
    ellipse.preRender(ctx);
    let rendered = ellipse.render(ctx, Posn.origin);
    expect(rendered.position()).toEqual({ x: 0, y: 0 });

    const moved = ellipse.movePinhole(5, 5);
    moved.preRender(ctx);
    rendered = moved.render(ctx, Posn.origin);
    expect(rendered.position()).toEqual({ x: 5, y: 5 });
  });

  test('should render in world', () => {
    const ellipse = new EllipseImage(30, 60, OutlineMode.SOLID, Color.RED).movePinhole(-15, -30);
    const { world } = oneShotTestWorld({ image: ellipse, w: 32, h: 62, x: 1, y: 1 });
    expectWorldToMatchSnapshot(world);
  });
});
