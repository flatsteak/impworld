import Konva from 'konva';

import { WorldImage } from '@/WorldImage/WorldImage';
import { Posn } from '@/util/Posn';
import { OutlineMode } from '@/WorldImage';
import { RenderContext } from '@/RenderContext';
import { Color } from '@/util/Color';
import { BBox } from '@/util/BBox';

export class CircleImage extends WorldImage<Konva.Circle> {
  constructor(
    private radius: number,
    private outline: OutlineMode,
    private color: Color,
  ) {
    super();
  }

  bbox() {
    const r = this.radius;
    return new BBox(new Posn(-r, -r), new Posn(r, r));
  }

  size() {
    return new Posn(this.radius * 2, this.radius * 2);
  }

  preRender() {
    this.node =
      this.node ||
      new Konva.Circle({
        radius: this.radius,
        fill: this.outline === OutlineMode.SOLID ? this.color.toString() : undefined,
        stroke: this.color.toString(),
        strokeWidth: 1,
      });
  }

  render(ctx: RenderContext, position: Posn) {
    const node = this.getNode();
    const center = position.minus(this.pinhole);
    node.setPosition(center.toVector());
    return node;
  }

  copy() {
    return new CircleImage(this.radius, this.outline, this.color) as this;
  }
}
