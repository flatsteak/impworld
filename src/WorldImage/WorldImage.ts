import { Posn } from '@/util/Posn';
import { RenderContext } from '@/RenderContext';
import Konva from 'konva';

type ValidChild = Konva.Shape | Konva.Group;

export abstract class WorldImage {
  constructor(protected pinhole: Posn = Posn.origin) {}

  abstract size(): Posn;

  abstract getItemsToRender(ctx: RenderContext, position: Posn): ValidChild;
  abstract copy(): this;

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

  movePinhole(dx: number, dy: number) {
    return this.movePinholeTo(this.pinhole.moved(dx, dy));
  }

  movePinholeTo(pos: Posn) {
    const copy = this.copy();
    copy.pinhole = pos;
    return copy;
  }
}
