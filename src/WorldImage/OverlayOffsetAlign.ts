import { AlignModeX, AlignModeY, WorldImage } from '@/WorldImage';
import { Posn } from '@/util';
import Konva from 'konva';

export class OverlayOffsetAlign extends WorldImage {
  constructor(
    private alignModeX: AlignModeX,
    private alignModeY: AlignModeY,
    private top: WorldImage,
    private dx: number,
    private dy: number,
    private bottom: WorldImage,
  ) {
    super();
  }

  copy() {
    return new OverlayOffsetAlign(
      this.alignModeX,
      this.alignModeY,
      this.top,
      this.dx,
      this.dy,
      this.bottom,
    ) as this;
  }

  size() {
    return new Posn(this.getWidth(), this.getHeight());
  }

  getWidth(): number {
    // TODO implement me
    return 0;
  }

  getHeight(): number {
    // TODO implement me
    return 0;
  }

  getItemsToRender(ctx: unknown, position: Posn) {
    return new Konva.Group({
      x: position.x,
      y: position.y,
    });
  }
}
