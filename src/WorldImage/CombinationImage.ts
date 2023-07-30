import { Posn } from '@/util/Posn';
import { Layer } from 'konva/lib/Layer';
import { WorldImage } from './WorldImage';
import Konva from 'konva';
import { RenderContext } from '@/RenderContext';
import { AlignModeX, AlignModeY } from '@/WorldImage';

export enum CombinationDirection {
  LeftToRight,
  TopToBottom,
  Overlay,
}

export class CombinationImage extends WorldImage {
  constructor(
    private objects: WorldImage[],
    private direction: CombinationDirection,
    private alignX: AlignModeX = AlignModeX.LEFT,
    private alignY: AlignModeY = AlignModeY.TOP,
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
        case CombinationDirection.Overlay:
          return new Posn(Math.max(acc.x, sz.x), Math.max(acc.y, sz.y));
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
        case CombinationDirection.Overlay:
          break;
        default:
          throw new Error('Invalid direction');
      }
    }
    return group;
  }
}

type WorldImages = [WorldImage, ...WorldImage[]];

export class BesideImage extends CombinationImage {
  constructor(...images: WorldImages) {
    super(images, CombinationDirection.LeftToRight);
  }
}

export class AboveImage extends CombinationImage {
  constructor(...images: WorldImages) {
    super(images, CombinationDirection.TopToBottom);
  }
}

export class OverlayImage extends CombinationImage {
  constructor(...images: WorldImages) {
    super(images, CombinationDirection.Overlay);
  }
}

export class BesideAlignImage extends CombinationImage {
  constructor(alignY: AlignModeY, ...images: WorldImages) {
    super(images, CombinationDirection.LeftToRight, undefined, alignY);
  }
}

export class AboveAlignImage extends CombinationImage {
  constructor(alignX: AlignModeX, ...images: WorldImages) {
    super(images, CombinationDirection.LeftToRight, alignX, undefined);
  }
}
