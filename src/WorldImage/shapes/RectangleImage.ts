import Konva from 'konva';

import { WorldImage } from '@/WorldImage/WorldImage';
import { Posn } from '@/util/Posn';
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
    const c = this.size().dividedBy(2);
    return new BBox(c.times(-1), c);
  }

  size() {
    return new Posn(this.width, this.height);
  }

  preRender(): void {
    const solid = this.outline === OutlineMode.SOLID;
    this.node =
      this.node ||
      new Konva.Rect({
        width: this.width,
        height: this.height,
        fill: solid ? this.color.toString() : undefined,
        stroke: this.color.toString(),
        strokeWidth: solid ? 0 : 1,
      });
  }

  render(ctx: RenderContext, position: Posn) {
    const node = this.getNode();
    // Draw the top left at -width/2, -height/2 by default, then shift by the pinhole, which
    // defaults to 0,0, which means "pinhole in the center"
    const topLeft = position.minus(this.size().dividedBy(2)).minus(this.pinhole).toVector();
    node.setPosition(topLeft);
    return node;
  }

  copy() {
    return new RectangleImage(this.width, this.height, this.outline, this.color) as this;
  }
}
