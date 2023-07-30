import { WorldImage } from '@/WorldImage/WorldImage';
import { Posn } from '@/util/Posn';
import Konva from 'konva';
import { OutlineMode } from '@/WorldImage';
import { RenderContext } from '@/RenderContext';
import { Color } from '@/util/Color';

export class RectangleImage extends WorldImage {
  constructor(
    private width: number,
    private height: number,
    private outline: OutlineMode,
    private color: Color,
  ) {
    super();
  }

  size() {
    return new Posn(this.width, this.height);
  }

  getItemsToRender(ctx: RenderContext, position: Posn) {
    return new Konva.Rect({
      x: position.x,
      y: position.y,
      width: this.width - 2,
      height: this.height - 2,
      fill: this.outline === OutlineMode.SOLID ? this.color.toString() : undefined,
      stroke: this.color.toString(),
      strokeWidth: 1,
    });
  }
}
