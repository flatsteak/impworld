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
      radius: radius - 1,
      fill: outline === OutlineMode.SOLID ? this.color.toString() : undefined,
      stroke: this.color.toString(),
      strokeWidth: 1,
    });
  }

  size() {
    return new Posn(this.radius * 2, this.radius * 2);
  }

  getItemsToRender(ctx: RenderContext, position: Posn) {
    this.node.setPosition(position.plus(this.pinhole).toVector());
    return this.node;
  }

  copy() {
    return new CircleImage(this.radius, this.outline, this.color) as this;
  }
}
