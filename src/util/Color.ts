const FACTOR = 0.7;

function hex(n: number) {
  return n.toString(16).padStart(2, '0');
}

export class Color {
  private color: string;

  constructor(color: string | number, g?: number, b?: number, a?: number) {
    if (typeof color === 'number') {
      if (g === undefined || b === undefined) {
        throw new Error('Color constructor requires 3 arguments if first argument is a number');
      }
      const alpha = a === undefined ? 'FF' : hex(a);
      this.color = `#${hex(color)}${hex(g)}${hex(b)}${alpha}`;
    } else {
      this.color = color;
    }
  }

  getRed() {
    return parseInt(this.color.slice(1, 3), 16);
  }

  getGreen() {
    return parseInt(this.color.slice(3, 5), 16);
  }

  getBlue() {
    return parseInt(this.color.slice(5, 7), 16);
  }

  getAlpha() {
    const alpha = this.color.slice(7, 9);
    if (alpha === '') {
      return 255;
    }
    return parseInt(alpha, 16);
  }

  brighter(): Color {
    let r: number = this.getRed();
    let g: number = this.getGreen();
    let b: number = this.getBlue();
    const alpha: number = this.getAlpha();

    const i: number = Math.floor(1.0 / (1.0 - FACTOR));

    if (r === 0 && g === 0 && b === 0) {
      return new Color(i, i, i, alpha);
    }
    if (r > 0 && r < i) {
      r = i;
    }
    if (g > 0 && g < i) {
      g = i;
    }
    if (b > 0 && b < i) {
      b = i;
    }

    return new Color(
      Math.min(Math.floor(r / FACTOR), 255),
      Math.min(Math.floor(g / FACTOR), 255),
      Math.min(Math.floor(b / FACTOR), 255),
      alpha,
    );
  }

  times(r: number, g?: number, b?: number, a?: number): Color {
    if (g === undefined && b === undefined && a === undefined) {
      return this.times(r, r, r, 1);
    }
    return new Color(
      Math.round(this.getRed() * r),
      Math.round(this.getGreen() * (g === undefined ? 1 : g)),
      Math.round(this.getBlue() * (b === undefined ? 1 : b)),
      Math.round(this.getAlpha() * (a === undefined ? 1 : a)),
    );
  }

  toString() {
    return this.color;
  }

  static WHITE = new Color('#ffffff');
  static BLACK = new Color('#000000');
  static TRANSPARENT = new Color('#00000000');
  static RED = new Color('#ff0000');
  static GREEN = new Color('#00ff00');
  static BLUE = new Color('#0000ff');
  static ORANGE = new Color('#ffa500');
  static YELLOW = new Color('#ffff00');
  static GRAY = new Color('#808080');
  static LIGHT_GRAY = new Color('#c0c0c0');
}
