import { WorldImage } from '@/WorldImage/WorldImage';
import { Posn } from '@/util/Posn';
import Konva from 'konva';
import { OutlineMode } from '@/WorldImage';
import { RenderContext } from '@/RenderContext';
import { Color } from '@/util/Color';

export enum FontStyle {
  REGULAR = 'regular',
  BOLD = 'bold',
  ITALIC = 'italic',
  BOLD_ITALIC = 'bold italic',
}

export class TextImage extends WorldImage {
  private text: string;
  private color: Color;
  private fontStyle: FontStyle = FontStyle.REGULAR;
  private fontSize: number = 13;
  private node: Konva.Text;

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

  size() {
    const sz = this.node.measureSize(this.text);
    return new Posn(sz.width, sz.height);
  }

  getItemsToRender(ctx: RenderContext, position: Posn) {
    this.node.setPosition(position.toVector());
    return this.node;
  }
}
