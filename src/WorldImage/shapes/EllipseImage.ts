import Konva from 'konva';

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

  preRender() {
    this.node =
      this.node ||
      new Konva.Ellipse({
        radiusX: this.width / 2,
        radiusY: this.height / 2,
        fill: this.outline === OutlineMode.SOLID ? this.color.toString() : undefined,
        stroke: this.color.toString(),
        strokeWidth: 1,
      });
  }

  render(ctx: RenderContext, position: Posn) {
    const node = this.getNode();
    node.setPosition(position.minus(this.pinhole).toVector());
    return node;
  }

  copy() {
    return new EllipseImage(this.width, this.height, this.outline, this.color) as this;
  }
}
