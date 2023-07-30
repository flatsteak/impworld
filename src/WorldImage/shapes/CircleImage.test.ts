import { describe, expect, test, vi } from 'vitest';
import { Posn } from '../../util/Posn';
import { CircleImage, OutlineMode } from '../../WorldImage';
import { Color } from '../../util/Color';
import Konva from 'konva';
import { World } from '@/World';

describe('Circle', () => {
  test('should render', () => {
    const layer = new Konva.Layer();
    const circle = new CircleImage(10, OutlineMode.SOLID, Color.RED);
    expect(circle.size()).toEqual(new Posn(20, 20));
    let rendered = circle.getItemsToRender({ layer }, Posn.origin);
    expect(rendered.position()).toEqual({ x: 0, y: 0 });

    const moved = circle.movePinhole(5, 5);
    rendered = moved.getItemsToRender({ layer }, Posn.origin);
    expect(rendered.position()).toEqual({ x: 5, y: 5 });
  });

  test('should render in world', () => {
    const circle = new CircleImage(10, OutlineMode.SOLID, Color.RED).movePinhole(5, 5);

    class MockWorld extends World {
      makeScene() {
        console.log('GOT MAKE SCENE');
        const s = this.getEmptyScene();
        s.placeImageXY(circle, 25, 25);
        return s;
      }
    }

    document.body.innerHTML = '<div id="world"></div>';
    const world = new MockWorld();
    const spy = vi.spyOn(circle, 'getItemsToRender');

    world.bigBang(100, 100);
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(expect.anything(), new Posn(25, 25));
  });
});
