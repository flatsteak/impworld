import { RenderContext } from '@/RenderContext';
import { WorldImage } from '@/WorldImage';
import { Posn } from '@/util';
import { BBox } from '@/util/BBox';
import Konva from 'konva';

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

  preRender(ctx: RenderContext): void {
    this.image.preRender(ctx);
  }

  render(ctx: RenderContext, position: Posn) {
    const image = this.image.render(ctx, Posn.origin);
    const group = new Konva.Group({});
    this.node = group;
    group.add(image);
    group.rotate(this.angle);
    const width = group.width();
    const height = group.height();
    group.setPosition(
      position
        .minus(new Posn(width / 2, height / 2))
        .plus(this.pinhole)
        .toVector(),
    );
    return group;
  }
}
