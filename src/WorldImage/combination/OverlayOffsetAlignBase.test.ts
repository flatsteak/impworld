import { describe, expect, test, vi } from 'vitest';
import { EllipseImage, OutlineMode, OverlayImage, RectangleImage } from '@/WorldImage';
import { Color, Posn } from '@/util';
import { fakeContext } from '../../../__tests__/fake-context';

describe('OverlayOffsetAlignBase', () => {
  test('should render', () => {
    const ctx = fakeContext();
    const top = new RectangleImage(30, 60, OutlineMode.SOLID, Color.GREEN);
    const bottom = new EllipseImage(60, 30, OutlineMode.SOLID, Color.RED);
    const overlay = new OverlayImage(top, bottom).movePinhole(-40, -40);
    overlay.preRender(ctx);
    const topSpy = vi.spyOn(top, 'render');
    const bottomSpy = vi.spyOn(bottom, 'render');
    expect(overlay.size()).toEqual(new Posn(60, 60));
    const rendered = overlay.render(ctx, Posn.origin);
    expect(topSpy).toHaveBeenCalledWith(ctx, new Posn(0, 0));
    expect(bottomSpy).toHaveBeenCalledWith(ctx, new Posn(0, 0));
  });
});
