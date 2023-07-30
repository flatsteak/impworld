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

type WorldImages = [WorldImage, ...WorldImage[]];

export class CombinationImage extends WorldImage {
  constructor(
    protected objects: WorldImages,
    protected direction: CombinationDirection,
    protected alignX: AlignModeX = AlignModeX.LEFT,
    protected alignY: AlignModeY = AlignModeY.TOP,
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

  copy() {
    return new CombinationImage(
      this.objects.map((obj) => obj.copy()) as WorldImages,
      this.direction,
      this.alignX,
      this.alignY,
    ) as this;
  }
}

export class BesideImage extends CombinationImage {
  constructor(...images: WorldImages) {
    super(images, CombinationDirection.LeftToRight);
  }

  copy() {
    return new BesideImage(...this.objects) as this;
  }
}

export class AboveImage extends CombinationImage {
  constructor(...images: WorldImages) {
    super(images, CombinationDirection.TopToBottom);
  }

  copy() {
    return new AboveImage(...this.objects) as this;
  }
}

export class OverlayImage extends CombinationImage {
  constructor(...images: WorldImages) {
    super(images, CombinationDirection.Overlay);
  }

  copy() {
    return new OverlayImage(...this.objects) as this;
  }
}

export class BesideAlignImage extends CombinationImage {
  constructor(alignY: AlignModeY, ...images: WorldImages) {
    super(images, CombinationDirection.LeftToRight, undefined, alignY);
  }

  copy() {
    return new BesideAlignImage(this.alignY, ...this.objects) as this;
  }
}

export class AboveAlignImage extends CombinationImage {
  constructor(alignX: AlignModeX, ...images: WorldImages) {
    super(images, CombinationDirection.LeftToRight, alignX, undefined);
  }

  copy() {
    return new AboveAlignImage(this.alignX, ...this.objects) as this;
  }
}
