import { RenderContext } from '@/RenderContext';
import { WorldImage } from '@/WorldImage';
import { Posn } from '@/util';
import Konva from 'konva';
import { Group } from 'konva/lib/Group';
import { Shape, ShapeConfig } from 'konva/lib/Shape';

export class FromFileImage extends WorldImage {
  private static Metadata: Record<string, HTMLImageElement> = {};

  node: Konva.Image;

  constructor(private url: string) {
    super();
    const image = FromFileImage.Metadata[url];
    if (!image) {
      throw new Error(`Image ${url} not preloaded - you must preload it so we have dimensions`);
    }
    this.node = new Konva.Image({
      image,
      width: image.width,
      height: image.height,
    });
  }

  copy() {
    return new FromFileImage(this.url) as this;
  }

  size() {
    return new Posn(this.node.width(), this.node.height());
  }

  getItemsToRender(ctx: RenderContext, position: Posn) {
    this.node.setPosition(
      position
        .moved(-this.node.width / 2, -this.node.height / 2)
        .plus(this.pinhole)
        .toVector(),
    );
    return this.node;
  }

  static async preload(...images: string[]) {
    const promises = images.map((url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          FromFileImage.Metadata[url] = img;
          resolve(undefined);
        };
        img.src = url;
      });
    });
    await Promise.all(promises);
  }
}
