import Konva from 'konva';

import { setFillAndStroke } from '../node-utils';

import { WorldImage } from '@/WorldImage/WorldImage';
import { Posn } from '@/util/Posn';
import { OutlineMode } from '@/WorldImage';
import { RenderContext } from '@/RenderContext';
import { Color } from '@/util/Color';
import { BBox } from '@/util/BBox';

export class TriangleImage extends WorldImage<Konva.Shape> {
  private _bbox: BBox;
  private _bias: Posn;

  constructor(
    private p1: Posn,
    private p2: Posn,
    private p3: Posn,
    private outline: OutlineMode,
    private color: Color,
  ) {
    super();
    this._bbox = new BBox(this.p1, this.p1).include(this.p2).include(this.p3);
    this._bias = Posn.center(this.p1, this.p2, this.p3);
  }

  bbox() {
    return this._bbox;
  }

  size() {
    return this.bbox().size();
  }

  getReusableIds(): string[] {
    return [];
  }

  createNode() {
    const sz = this.size();
    const { p1, p2, p3 } = this;
    return new Konva.Shape({
      width: sz.x,
      height: sz.y,
      sceneFunc(context, shape) {
        context.beginPath();
        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.lineTo(p3.x, p3.y);
        context.closePath();
        context.fillStrokeShape(shape);
      },
    });
  }

  render(ctx: RenderContext, node: Konva.Rect, position: Posn) {
    setFillAndStroke(node, this.outline, this.color);
    // Draw the top left at -width/2, -height/2 by default, then shift by the pinhole, which
    // defaults to 0,0, which means "pinhole in the center"
    const topLeft = position
      .plus(this._bias)
      .minus(this.size().dividedBy(2))
      .minus(this.pinhole)
      .toVector();
    node.setPosition(topLeft);
    return node;
  }

  copy() {
    return new TriangleImage(this.p1, this.p2, this.p3, this.outline, this.color) as this;
  }
}
