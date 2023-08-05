import Konva from 'konva';

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
    this.node = new Konva.Text({
      x: 0,
      y: 0,
      align: 'left',
      text: this.text,
      fontSize: this.fontSize,
      fontStyle: this.fontStyle,
      fill: this.color.toString(),
    });
  }

  copy() {
    return new TextImage(this.text, this.fontSize, this.fontStyle, this.color) as this;
  }

  bbox() {
    const tl = this.pinhole.times(-1);
    return new BBox(tl, tl.plus(this.size()));
  }

  size() {
    const sz = this.getNode().measureSize(this.text);
    return new Posn(sz.width, sz.height);
  }

  preRender() {
    // nothing to do since we needed the node to measure size
  }

  render(ctx: RenderContext, position: Posn) {
    this.getNode().setPosition(position.toVector());
    return this.getNode();
  }
}
