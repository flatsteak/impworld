import { Posn } from '@/util/Posn';
import { RenderContext } from '@/RenderContext';
import Konva from 'konva';

type ValidChild = Konva.Shape | Konva.Group;

export abstract class WorldImage {
  constructor(private pinhole?: Posn) {}

  abstract size(): Posn;

  abstract getItemsToRender(ctx: RenderContext, position: Posn): ValidChild;

  getPinhole() {
    if (!this.pinhole) {
      return this.size().dividedBy(2);
    }
    return this.pinhole;
  }

  getWidth() {
    return this.size().x;
  }

  getHeight() {
    return this.size().y;
  }
}
