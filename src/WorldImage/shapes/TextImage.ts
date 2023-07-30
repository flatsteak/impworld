import { WorldImage } from '@/WorldImage/WorldImage';
import { Posn } from '@/util/Posn';
import Konva from 'konva';
import { OutlineMode } from '@/WorldImage';
import { RenderContext } from '@/RenderContext';
import { Color } from '@/util/Color';

export class TextImage extends WorldImage {
  private text: string;
  private color: Color;
  private fontSize: number = 13;
  private node: Konva.Text;

  constructor(text: string, colorOrSize: Color | number, colorOrFontStyle?: Color) {
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
    }
    this.node = new Konva.Text({
      x: 0,
      y: 0,
      align: 'left',
      text: this.text,
    });
  }

  size() {
    const sz = this.node.measureSize(this.text);
    return new Posn(sz.width, sz.height);
  }

  getItemsToRender(ctx: RenderContext, position: Posn) {
    return new Konva.Text({
      x: position.x,
      y: position.y,
      align: 'left',
      text: this.text,
      fontSize: this.fontSize,
      fill: this.color.toString(),
    });
  }
}
