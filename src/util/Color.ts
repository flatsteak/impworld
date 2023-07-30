export class Color {
  constructor(private color: string) {}

  toString() {
    return this.color;
  }

  static WHITE = new Color('white');
  static BLACK = new Color('black');
  static TRANSPARENT = new Color('transparent');
  static RED = new Color('red');
  static GREEN = new Color('green');
  static BLUE = new Color('blue');
  static ORANGE = new Color('orange');
}
