import Konva from 'konva';

import { setFillAndStroke } from '../node-utils';

import { WorldImage } from '@/WorldImage/WorldImage';
import { Posn } from '@/util/Posn';
import { OutlineMode } from '@/WorldImage';
import { RenderContext } from '@/RenderContext';
import { Color } from '@/util/Color';
import { BBox } from '@/util/BBox';

export class EllipseImage extends WorldImage<Konva.Ellipse> {
  constructor(
    private width: number,
    private height: number,
    private outline: OutlineMode,
    private color: Color,
  ) {
    super();
  }

  bbox() {
    const tl = this.pinhole.times(-1);
    return new BBox(tl, tl.plus(this.size()));
  }

  size() {
    return new Posn(this.width, this.height);
  }

  getReusableIds(): string[] {
    return [`${this.width}-${this.height}-${this.outline}`, `${this.width}-${this.height}`, 'any'];
  }

  createNode(ctx: RenderContext) {
    const node = ctx.previousNodeCache?.getReusableNode(Konva.Ellipse, this.getReusableIds());
    return (
      node ||
      new Konva.Ellipse({
        radiusX: this.width / 2,
        radiusY: this.height / 2,
        strokeWidth: 1,
      })
    );
  }

  render(ctx: RenderContext, node: Konva.Ellipse, position: Posn) {
    node.radiusX(this.width / 2);
    node.radiusY(this.height / 2);
    setFillAndStroke(node, this.outline, this.color);
    node.setPosition(position.minus(this.pinhole).toVector());
  }

  copy() {
    return new EllipseImage(this.width, this.height, this.outline, this.color) as this;
  }
}
