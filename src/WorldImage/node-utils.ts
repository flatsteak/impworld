import Konva from 'konva';

import { Color } from '../util/Color';

import { OutlineMode } from './OutlineMode';

export function setFillAndStroke(node: Konva.Shape, outlineMode: OutlineMode, color: Color) {
  if (outlineMode === OutlineMode.SOLID) {
    node.fillEnabled(true);
    node.fill(color.toString());
  } else {
    node.fillEnabled(false);
  }
  node.stroke(color.toString());
}
