import Konva from 'konva';

import { WorldImage } from './WorldImage';

import { BBox } from '@/util/BBox';
import { Posn } from '@/util/Posn';

export class EmptyImage extends WorldImage<Konva.Rect> {
  bbox() {
    return new BBox(Posn.origin, Posn.origin);
  }

  getReusableIds(): string[] {
    return ['empty-node'];
  }

  createNode() {
    return new Konva.Rect({
      width: 0,
      height: 0,
    });
  }

  render() {}

  copy() {
    return new EmptyImage() as this;
  }
}
