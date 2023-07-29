import { WorldImage } from '@/WorldImage/WorldImage';
import { Posn } from '@/util/Posn';
import Konva from 'konva';
import { OutlineMode } from '@/WorldImage';
import { RenderContext } from '@/RenderContext';

export class RectangleImage extends WorldImage {
  constructor(
    private width: number,
    private height: number,
    private outline: OutlineMode,
    private color: string,
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
      width: this.width - 4,
      height: this.height - 4,
      fill: this.outline === OutlineMode.SOLID ? this.color : undefined,
      stroke: this.color,
      strokeWidth: 2,
    });
  }
}
