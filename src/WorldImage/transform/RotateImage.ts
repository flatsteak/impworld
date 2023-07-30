import { RenderContext } from '@/RenderContext';
import { WorldImage } from '@/WorldImage';
import { Posn } from '@/util';
import Konva from 'konva';

export class RotateImage extends WorldImage {
  constructor(
    public readonly image: WorldImage,
    public readonly angle: number,
  ) {
    super();
  }

  copy() {
    return new RotateImage(this.image, this.angle) as this;
  }

  size() {
    // Complicated one. Let's use a rect.
    const imageSize = this.image.size();
    const rect = new Konva.Rect({ x: 0, y: 0, width: imageSize.x, height: imageSize.y });
    rect.rotate(this.angle);
    return new Posn(rect.width(), rect.height());
  }

  getItemsToRender(ctx: RenderContext, position: Posn) {
    const image = this.image.getItemsToRender(ctx, Posn.origin);
    const group = new Konva.Group({});
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
