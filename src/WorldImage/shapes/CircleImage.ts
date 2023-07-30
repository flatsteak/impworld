import { WorldImage } from '@/WorldImage/WorldImage';
import { Posn } from '@/util/Posn';
import Konva from 'konva';
import { OutlineMode } from '@/WorldImage';
import { RenderContext } from '@/RenderContext';
import { Color } from '@/util/Color';

export class CircleImage extends WorldImage {
  node: Konva.Circle;

  constructor(
    private radius: number,
    private outline: OutlineMode,
    private color: Color,
  ) {
    super();
    this.node = new Konva.Circle({
      x: 0,
      y: 0,
      radius: this.radius - 1,
      fill: this.outline === OutlineMode.SOLID ? this.color.toString() : undefined,
      stroke: this.color.toString(),
      strokeWidth: 1,
    });
  }

  size() {
    return new Posn(this.radius * 2, this.radius * 2);
  }

  getItemsToRender(ctx: RenderContext, position: Posn) {
    this.node.setPosition(position.toVector());
    return this.node;
  }
}
