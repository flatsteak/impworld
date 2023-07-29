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
  }

  draw(layer: Konva.Layer) {
    this.images.forEach(({ image, position }) => {
      const item = image.getItemsToRender({ layer }, position);
      layer.add(item);
    });
  }
}
