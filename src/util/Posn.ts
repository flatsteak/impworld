export class Posn {
  static readonly origin = new Posn(0, 0);

  constructor(
    public x: number,
    public y: number,
  ) {
    // This is to get around weirdness with -0 and +0
    if (x === 0) {
      this.x = 0;
    }
    if (y === 0) {
      this.y = 0;
    }
  }

  equals(other: Posn): boolean {
    return this.x === other.x && this.y === other.y;
  }

  round() {
    return new Posn(Math.round(this.x), Math.round(this.y));
  }

  plus(other: Posn): Posn {
    return this.moved(other.x, other.y);
  }

  minus(other: Posn): Posn {
    return this.moved(-other.x, -other.y);
  }

  moved(dx: number, dy: number): Posn {
    return new Posn(this.x + dx, this.y + dy);
  }

  dividedBy(nx: number, ny?: number): Posn {
    return new Posn(this.x / nx, this.y / (ny || nx));
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

  static center(...posns: Posn[]): Posn {
    const sum = posns.reduce((acc, p) => acc.plus(p), Posn.origin);
    return sum.dividedBy(posns.length);
  }
}
