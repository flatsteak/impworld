import { WorldImage } from '@/WorldImage/WorldImage';
import { Posn } from '@/util/Posn';
import Konva from 'konva';
import { OutlineMode } from '@/WorldImage';
import { RenderContext } from '@/RenderContext';

export class CircleImage extends WorldImage {
  constructor(
    private radius: number,
    private outline: OutlineMode,
    private color: string,
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
      radius: this.radius - 2,
      fill: this.outline === OutlineMode.SOLID ? this.color : undefined,
      stroke: this.color,
      strokeWidth: 2,
    });
  }
}
