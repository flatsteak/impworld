import Konva from 'konva';

import { RenderContext } from '@/RenderContext';
import { ReusableNodeCache } from '@/World/ReusableNodeCache';

export function fakeContext(): RenderContext {
  return {
    layer: {} as Konva.Layer,
    previousNodeCache: new ReusableNodeCache(),
    nextNodeCache: new ReusableNodeCache(),
  };
}
