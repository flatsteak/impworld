import Konva from 'konva';

import { WorldImage } from './WorldImage';

import { BBox } from '@/util/BBox';
import { Posn } from '@/util/Posn';

export class EmptyImage extends WorldImage<Konva.Rect> {
  bbox() {
    return new BBox(Posn.origin, Posn.origin);
  }

  preRender() {
    this.node = new Konva.Rect({
      width: 0,
      height: 0,
    });
  }

  render() {
    return this.getNode();
  }

  copy() {
    return new EmptyImage() as this;
  }
}
