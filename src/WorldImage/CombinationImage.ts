import { Posn } from '@/util/Posn';
import { Layer } from 'konva/lib/Layer';
import { WorldImage } from './WorldImage';
import Konva from 'konva';
import { RenderContext } from '@/RenderContext';

export enum CombinationDirection {
  LeftToRight,
  TopToBottom,
}

export class CombinationImage extends WorldImage {
  constructor(
    private objects: WorldImage[],
    private direction: CombinationDirection,
  ) {
    super();
  }

  size() {
    return this.objects.reduce((acc, obj) => {
      const sz = obj.size();
      switch (this.direction) {
        case CombinationDirection.LeftToRight:
          return new Posn(acc.x + sz.x, Math.max(acc.y, sz.y));
        case CombinationDirection.TopToBottom:
          return new Posn(Math.max(acc.x, sz.x), acc.y + sz.y);
        default:
          throw new Error('Invalid direction');
      }
    }, Posn.origin);
    return Posn.origin;
  }

  getItemsToRender(ctx: RenderContext, position: Posn) {
    let spot = Posn.origin;
    const group = new Konva.Group({
      x: position.x,
      y: position.y,
    });

    for (const obj of this.objects) {
      group.add(obj.getItemsToRender(ctx, spot));
      switch (this.direction) {
        case CombinationDirection.LeftToRight:
          spot = spot.moved(obj.size().x, 0);
          break;
        case CombinationDirection.TopToBottom:
          spot = spot.moved(0, obj.size().y);
          break;
        default:
          throw new Error('Invalid direction');
      }
    }
    return group;
  }
}

export class BesideImage extends CombinationImage {
  constructor(image: WorldImage, ...others: WorldImage[]) {
    super([image, ...others], CombinationDirection.LeftToRight);
  }
}

export class AboveImage extends CombinationImage {
  constructor(image: WorldImage, ...others: WorldImage[]) {
    super([image, ...others], CombinationDirection.TopToBottom);
  }
}
