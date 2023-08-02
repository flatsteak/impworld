import { Posn } from '@/util/Posn';
import { WorldImage } from '@/WorldImage';
import Konva from 'konva';

interface PlacedImage {
  image: WorldImage;
  position: Posn;
}

export class WorldScene {
  images: PlacedImage[] = [];

  constructor(private size: Posn) {}

  placeImageXY(image: WorldImage, x: number, y: number) {
    this.images.push({ image, position: new Posn(x, y) });
    return this;
  }

  draw(layer: Konva.Layer) {
    const context = { layer };
    this.images.forEach(({ image, position }) => {
      image.preRender(context);
      const item = image.render(context, position);
      layer.add(item);
    });
  }
}
