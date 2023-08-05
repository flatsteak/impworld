import Konva from 'konva';

import { ReusableNodeCache } from './World/ReusableNodeCache';

export interface RenderContext {
  layer: Konva.Layer;
  previousNodeCache?: ReusableNodeCache;
  nextNodeCache: ReusableNodeCache;
}
