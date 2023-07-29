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

  dividedBy(n: number): Posn {
    return new Posn(Math.round(this.x / n), Math.round(this.y / n));
  }

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}
