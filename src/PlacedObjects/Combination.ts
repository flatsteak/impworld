import { PlacedObject } from './PlacedObject';

export enum CombinationDirection {
  LeftToRight,
  TopToBottom,
}

export class Combination extends PlacedObject {
  constructor(
    private objects: PlacedObject[],
    private direction: CombinationDirection,
  ) {
    super();
  }
}
