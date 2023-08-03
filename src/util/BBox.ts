import { Posn } from './Posn';

export class BBox {
  constructor(
    public readonly topLeft: Posn,
    public readonly bottomRight: Posn,
  ) {}

  combine(other: BBox) {
    return new BBox(
      new Posn(
        Math.min(this.topLeft.x, other.topLeft.x),
        Math.min(this.topLeft.y, other.topLeft.y),
      ),
      new Posn(
        Math.max(this.bottomRight.x, other.bottomRight.x),
        Math.max(this.bottomRight.y, other.bottomRight.y),
      ),
    );
  }

  equals(other: BBox): boolean {
    return this.topLeft.equals(other.topLeft) && this.bottomRight.equals(other.bottomRight);
  }

  size() {
    return this.bottomRight.minus(this.topLeft);
  }

  toString() {
    return `[${this.topLeft}:${this.bottomRight}]`;
  }
}
