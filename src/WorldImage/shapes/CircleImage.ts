import { WorldImage } from '@/WorldImage/WorldImage';
import { Posn } from '@/util/Posn';
import Konva from 'konva';
import { OutlineMode } from '@/WorldImage';
import { RenderContext } from '@/RenderContext';
import { Color } from '@/util/Color';

export class CircleImage extends WorldImage {
  constructor(
    private radius: number,
    private outline: OutlineMode,
    private color: Color,
  ) {
    super();
  }

  size() {
    return new Posn(this.radius * 2, this.radius * 2);
  }

  getItemsToRender(ctx: RenderContext, position: Posn) {
    return new Konva.Circle({
      x: position.x,
      y: position.y,
      radius: this.radius - 1,
      fill: this.outline === OutlineMode.SOLID ? this.color.toString() : undefined,
      stroke: this.color.toString(),
      strokeWidth: 1,
    });
  }
}
