import Konva from 'konva';

import { RenderContext } from '@/RenderContext';
import { WorldImage } from '@/WorldImage';
import { Posn } from '@/util';
import { BBox } from '@/util/BBox';

export class RotateImage extends WorldImage<Konva.Group> {
  constructor(
    public readonly image: WorldImage,
    public readonly angle: number,
  ) {
    super();
  }

  copy() {
    return new RotateImage(this.image, this.angle) as this;
  }

  bbox() {
    const tl = this.pinhole.times(-1);
    return new BBox(tl, tl.plus(this.size()));
  }

  size() {
    // Complicated one. Let's use a rect.
    const imageSize = this.image.size();
    const rect = new Konva.Rect({ x: 0, y: 0, width: imageSize.x, height: imageSize.y });
    rect.rotate(this.angle);
    return new Posn(rect.width(), rect.height());
  }

  getReusableIds(): string[] {
    // Not yet, reuse is more complicated.
    return [];
  }

  createNode(ctx: RenderContext) {
    const child = this.image.createNode(ctx);
    ctx.nextNodeCache.addNode(this.image.getReusableIds(), child);
    const group = new Konva.Group({});
    group.add(child);
    return group;
  }

  render(ctx: RenderContext, node: Konva.Group, position: Posn) {
    this.image.render(ctx, node.children![0], position);
    node.rotate(this.angle);
    const width = node.width();
    const height = node.height();
    node.setPosition(
      position
        .minus(new Posn(width / 2, height / 2))
        .plus(this.pinhole)
        .toVector(),
    );
  }
}
