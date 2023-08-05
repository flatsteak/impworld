import Konva from 'konva';
import { Text } from 'konva/lib/shapes/Text';

import { WorldImage } from '@/WorldImage/WorldImage';
import { Posn } from '@/util/Posn';
import { RenderContext } from '@/RenderContext';
import { Color } from '@/util/Color';
import { BBox } from '@/util/BBox';

export enum FontStyle {
  REGULAR = 'regular',
  BOLD = 'bold',
  ITALIC = 'italic',
  BOLD_ITALIC = 'bold italic',
}

export class TextImage extends WorldImage<Konva.Text> {
  private _size: Posn;
  private text: string;
  private color: Color;
  private fontStyle: FontStyle = FontStyle.REGULAR;
  private fontSize: number = 13;

  constructor(
    text: string,
    colorOrSize: Color | number,
    colorOrFontStyle?: Color | FontStyle,
    maybeColor?: Color,
  ) {
    super();
    this.text = text;
    this.color = Color.BLACK;
    if (colorOrSize instanceof Color) {
      this.color = colorOrSize;
    } else {
      this.fontSize = colorOrSize;
    }
    if (colorOrFontStyle instanceof Color) {
      this.color = colorOrFontStyle;
    } else if (colorOrFontStyle) {
      this.fontStyle = colorOrFontStyle;
    }
    if (maybeColor instanceof Color) {
      this.color = maybeColor;
    }
    const measure = new Konva.Text({
      x: 0,
      y: 0,
      align: 'left',
      text: this.text,
      fontSize: this.fontSize,
      fontStyle: this.fontStyle,
      fill: this.color.toString(),
    }).measureSize(this.text);
    this._size = new Posn(measure.width, measure.height);
  }

  copy() {
    return new TextImage(this.text, this.fontSize, this.fontStyle, this.color) as this;
  }

  getReusableIds(): string[] {
    // Not yet.
    return [];
  }

  bbox() {
    const tl = this.pinhole.times(-1);
    return new BBox(tl, tl.plus(this.size()));
  }

  size() {
    return this._size;
  }

  createNode(): Text {
    return new Konva.Text({
      align: 'left',
    });
  }

  render(ctx: RenderContext, node: Text, position: Posn): void {
    node.text(this.text);
    node.fontSize(this.fontSize);
    node.fontStyle(this.fontStyle);
    node.fill(this.color.toString());
    node.setPosition(position.minus(this.pinhole).toVector());
  }
}
