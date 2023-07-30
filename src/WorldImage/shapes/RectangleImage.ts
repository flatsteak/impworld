import { WorldImage } from '@/WorldImage/WorldImage';
import { Posn } from '@/util/Posn';
import Konva from 'konva';
import { OutlineMode } from '@/WorldImage';
import { RenderContext } from '@/RenderContext';
import { Color } from '@/util/Color';

export class RectangleImage extends WorldImage {
  node: Konva.Rect;
  centerOffset: Posn;

  constructor(
    private width: number,
    private height: number,
    private outline: OutlineMode,
    private color: Color,
  ) {
    super();
    this.centerOffset = new Posn(width / 2, height / 2);
    this.node = new Konva.Rect({
      width: this.width - 2,
      height: this.height - 2,
      fill: this.outline === OutlineMode.SOLID ? this.color.toString() : undefined,
      stroke: this.color.toString(),
      strokeWidth: 1,
    });
  }

  size() {
    return new Posn(this.width, this.height);
  }

  getItemsToRender(ctx: RenderContext, position: Posn) {
    this.node.setPosition(position.minus(this.centerOffset).plus(this.pinhole).toVector());
    return this.node;
  }

  copy() {
    return new RectangleImage(this.width, this.height, this.outline, this.color) as this;
  }
}
