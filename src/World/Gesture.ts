import TouchSweep from 'touchsweep';

import { Posn } from '../util/Posn';

export type TouchEvents = 'swipeleft' | 'swiperight' | 'swipeup' | 'swipedown';

interface GestureEvent {
  detail: {
    endX: number;
    endY: number;
  };
}

export function addGestureHandlers(
  node: HTMLElement,
  handler: (name: TouchEvents, posn: Posn) => void,
) {
  const add = (name: TouchEvents) =>
    node.addEventListener(name, (event) => {
      const e = event as unknown as GestureEvent;
      handler(name, new Posn(e.detail.endX, e.detail.endY));
    });
  new TouchSweep(node, {}, 20);
  add('swipeleft');
  add('swiperight');
  add('swipeup');
  add('swipedown');
}
