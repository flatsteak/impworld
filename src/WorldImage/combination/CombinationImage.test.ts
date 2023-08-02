import { BesideImage, OutlineMode, RectangleImage } from '@/WorldImage';
import { Color, Posn } from '@/util';
import Konva from 'konva';
import { describe, expect, test } from 'vitest';
import { fakeContext } from '../../../__tests__/fake-context';

describe('Beside Image', () => {
  test('should render', () => {
    const layer = new Konva.Layer();
    const r1 = new RectangleImage(50, 50, OutlineMode.SOLID, Color.RED);
    const r2 = new RectangleImage(50, 50, OutlineMode.SOLID, Color.GREEN);
    const r3 = new RectangleImage(50, 50, OutlineMode.SOLID, Color.BLUE);
    const image = new BesideImage(r1, r2, r3).movePinholeTo(Posn.origin);
    image.preRender(fakeContext());
    const rendered = image.render(fakeContext(), Posn.origin);
    expect(rendered.position()).toEqual({ x: 0, y: 0 });
    expect(rendered.width()).toEqual(150);
  });
});
