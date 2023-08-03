import Konva from 'konva';

import { WorldImage } from '../WorldImage';

import { getPositions, getSize } from './comboPositioning';

import { Posn } from '@/util/Posn';
import { RenderContext } from '@/RenderContext';
import { AlignModeX, AlignModeY } from '@/WorldImage';
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
    const spot = Posn.origin;
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
