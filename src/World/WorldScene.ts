import Konva from 'konva';

import { ReusableNodeCache } from './ReusableNodeCache';

import { Posn } from '@/util/Posn';
import { WorldImage } from '@/WorldImage';
import { RenderContext } from '@/RenderContext';

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

  draw(layer: Konva.Layer, nodeCache?: ReusableNodeCache) {
    const context: RenderContext = {
      layer,
      previousNodeCache: nodeCache,
      nextNodeCache: new ReusableNodeCache(),
    };
    this.images.forEach(({ image, position }) => {
      const reusable = image.getReusableIds();
      const node = image.createNode(context);
      if (reusable?.length) {
        context.nextNodeCache.addNode(image.getReusableIds(), node);
      }
      image.render(context, node, position);
      layer.add(node);
    });
    return context.nextNodeCache;
  }
}
