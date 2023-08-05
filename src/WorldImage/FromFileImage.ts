import Konva from 'konva';

import { RenderContext } from '@/RenderContext';
import { WorldImage } from '@/WorldImage';
import { Posn } from '@/util';
import { BBox } from '@/util/BBox';

export class FromFileImage extends WorldImage<Konva.Image> {
  private static Metadata: Record<string, HTMLImageElement> = {};

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

  private image: HTMLImageElement;

  constructor(private url: string) {
    super();
    const image = FromFileImage.Metadata[url];
    if (!image) {
      throw new Error(`Image ${url} not preloaded - you must preload it so we have dimensions`);
    }
    this.image = image;
  }

  copy() {
    return new FromFileImage(this.url) as this;
  }

  bbox() {
    const tl = this.pinhole.times(-1);
    return new BBox(tl, tl.plus(this.size()));
  }

  size() {
    return new Posn(this.image.width, this.image.height);
  }

  getReusableIds(): string[] {
    return [this.url];
  }

  createNode(): Konva.Image {
    return new Konva.Image({
      image: this.image,
      width: this.image.width,
      height: this.image.height,
    });
  }

  render(ctx: RenderContext, node: Konva.Image, position: Posn) {
    node.setPosition(
      position
        .moved(-this.image.width / 2, -this.image.height / 2)
        .minus(this.pinhole)
        .toVector(),
    );
  }
}
