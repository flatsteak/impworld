import Konva from 'konva';

import { setFillAndStroke } from '../node-utils';

import { WorldImage } from '@/WorldImage/WorldImage';
import { Posn } from '@/util/Posn';
import { OutlineMode } from '@/WorldImage';
import { RenderContext } from '@/RenderContext';
import { Color } from '@/util/Color';
import { BBox } from '@/util/BBox';

export class CircleImage extends WorldImage<Konva.Circle> {
  constructor(
    private radius: number,
    private outline: OutlineMode,
    private color: Color,
  ) {
    super();
  }

  bbox() {
    const r = this.radius;
    return new BBox(new Posn(-r, -r), new Posn(r, r));
  }

  size() {
    return new Posn(this.radius * 2, this.radius * 2);
  }

  getReusableIds(): string[] {
    return [`${this.radius}-${this.outline}`];
  }

  createNode(ctx: RenderContext) {
    const node = ctx.previousNodeCache?.getReusableNode(Konva.Circle, this.getReusableIds());
    return (
      node ||
      new Konva.Circle({
        strokeWidth: 1,
      })
    );
  }

  render(ctx: RenderContext, node: Konva.Circle, position: Posn) {
    const center = position.minus(this.pinhole);
    node.radius(this.radius);
    setFillAndStroke(node, this.outline, this.color);
    node.setPosition(center.toVector());
  }

  copy() {
    return new CircleImage(this.radius, this.outline, this.color) as this;
  }
}
