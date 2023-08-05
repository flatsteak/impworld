import Konva from 'konva';

import { setFillAndStroke } from '../node-utils';

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

  getReusableIds(): string[] {
    return [`${this.width}-${this.height}-${this.outline}`, `${this.width}-${this.height}`, 'any'];
  }

  createNode(ctx: RenderContext) {
    const node = ctx.previousNodeCache?.getReusableNode(Konva.Rect, this.getReusableIds());
    return (
      node ||
      new Konva.Rect({
        width: this.width,
        height: this.height,
        strokeWidth: 1,
      })
    );
  }

  render(ctx: RenderContext, node: Konva.Rect, position: Posn) {
    node.width(this.width);
    node.height(this.height);
    setFillAndStroke(node, this.outline, this.color);
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
