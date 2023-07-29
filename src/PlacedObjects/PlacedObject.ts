import { Posn } from '@/Posn';

export abstract class PlacedObject {
  constructor(private pinhole?: Posn) {}

  abstract size(): Posn;

  abstract render(ctx: CanvasRenderingContext2D, position: Posn): void;

  getPinhole(): Posn {
    if (!this.pinhole) {
      return this.size().dividedBy(2);
    }
    return this.pinhole;
  }
}
