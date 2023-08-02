import { WorldImage } from '@/WorldImage/WorldImage';
import { Posn } from '@/util/Posn';
import Konva from 'konva';
import { OutlineMode } from '@/WorldImage';
import { RenderContext } from '@/RenderContext';
import { Color } from '@/util/Color';
import { BBox } from '@/util/BBox';

export class RectangleImage extends WorldImage<Konva.Rect> {
  constructor(
    private width: number,
    private height: number,
    private outline: OutlineMode,
    private color: Color,
  ) {
    super();
  }

  bbox(): BBox {
    const tl = this.pinhole.times(-1);
    return new BBox(tl, tl.plus(this.size()));
  }

  size() {
    return new Posn(this.width, this.height);
  }

  preRender(ctx: RenderContext): void {
    this.node =
      this.node ||
      new Konva.Rect({
        width: this.width,
        height: this.height,
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
    return new RectangleImage(this.width, this.height, this.outline, this.color) as this;
  }
}
