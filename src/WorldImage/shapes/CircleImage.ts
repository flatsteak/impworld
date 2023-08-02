import { WorldImage } from '@/WorldImage/WorldImage';
import { Posn } from '@/util/Posn';
import Konva from 'konva';
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
    const tl = this.pinhole.times(-1);
    return new BBox(tl, tl.plus(this.size()));
  }

  size() {
    return new Posn(this.radius * 2, this.radius * 2);
  }

  preRender(ctx: RenderContext) {
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
    node.setPosition(position.minus(this.pinhole).moved(this.radius, this.radius).toVector());
    return node;
  }

  copy() {
    return new CircleImage(this.radius, this.outline, this.color) as this;
  }
}
