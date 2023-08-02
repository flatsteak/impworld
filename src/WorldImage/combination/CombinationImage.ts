import Konva from 'konva';
import { Posn } from '@/util/Posn';
import { WorldImage } from '../WorldImage';
import { RenderContext } from '@/RenderContext';
import { AlignModeX, AlignModeY } from '@/WorldImage';
import { getPositions, getSize } from './comboPositioning';
import { BBox } from '@/util/BBox';

export enum CombinationDirection {
  LeftToRight,
  TopToBottom,
  Overlay,
}

export class CombinationImage extends WorldImage<Konva.Group> {
  constructor(
    protected objects: WorldImage[],
    protected direction: CombinationDirection,
    protected alignX: AlignModeX = AlignModeX.PINHOLE,
    protected alignY: AlignModeY = AlignModeY.PINHOLE,
  ) {
    super();
  }

  bbox(): BBox {
    const tl = this.pinhole.times(-1);
    return new BBox(tl, tl.plus(this.size()));
  }

  size() {
    return getSize(this.objects, this.direction, this.alignX, this.alignY);
  }

  preRender(ctx: RenderContext) {
    this.objects.forEach((obj) => obj.preRender(ctx));
  }

  render(ctx: RenderContext, position: Posn) {
    let spot = Posn.origin;
    const pinhole = this.pinhole;

    const group = new Konva.Group({
      x: position.x - pinhole.x,
      y: position.y - pinhole.y,
    });

    const positions = getPositions(this.objects, this.direction, this.alignX, this.alignY);
    this.objects.forEach((obj, i) => {
      group.add(obj.render(ctx, positions[i]));
    });

    this.node = group;
    return group;
  }

  copy() {
    return new CombinationImage(
      this.objects.map((obj) => obj.copy()),
      this.direction,
      this.alignX,
      this.alignY,
    ) as this;
  }
}

export class BesideImage extends CombinationImage {
  constructor(...images: WorldImage[]) {
    super(images, CombinationDirection.LeftToRight);
  }

  copy() {
    return new BesideImage(...this.objects) as this;
  }
}

export class AboveImage extends CombinationImage {
  constructor(...images: WorldImage[]) {
    super(images, CombinationDirection.TopToBottom);
  }

  copy() {
    return new AboveImage(...this.objects) as this;
  }
}

export class BesideAlignImage extends CombinationImage {
  constructor(alignY: AlignModeY, ...images: WorldImage[]) {
    super(images, CombinationDirection.LeftToRight, undefined, alignY);
  }

  copy() {
    return new BesideAlignImage(this.alignY, ...this.objects) as this;
  }
}

export class AboveAlignImage extends CombinationImage {
  constructor(alignX: AlignModeX, ...images: WorldImage[]) {
    super(images, CombinationDirection.LeftToRight, alignX, undefined);
  }

  copy() {
    return new AboveAlignImage(this.alignX, ...this.objects) as this;
  }
}
