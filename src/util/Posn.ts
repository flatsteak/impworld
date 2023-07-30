export class Posn {
  static readonly origin = new Posn(0, 0);

  constructor(
    public x: number,
    public y: number,
  ) {}

  equals(other: Posn): boolean {
    return this.x === other.x && this.y === other.y;
  }

  plus(other: Posn): Posn {
    return new Posn(this.x + other.x, this.y + other.y);
  }

  minus(other: Posn): Posn {
    return new Posn(this.x - other.x, this.y - other.y);
  }

  moved(dx: number, dy: number): Posn {
    return new Posn(this.x + dx, this.y + dy);
  }

  dividedBy(nx: number, ny?: number): Posn {
    return new Posn(Math.round(this.x / nx), Math.round(this.y / (ny || nx)));
  }

  times(mx: number, my?: number): Posn {
    return new Posn(this.x * mx, this.y * (my === undefined ? mx : my));
  }

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }

  toVector() {
    return { x: this.x, y: this.y };
  }
}
