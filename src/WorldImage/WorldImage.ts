import Konva from 'konva';

import { Posn } from '@/util/Posn';
import { RenderContext } from '@/RenderContext';
import { BBox } from '@/util/BBox';

export type ValidRenderNode = Konva.Shape | Konva.Group;

export abstract class WorldImage<T extends ValidRenderNode = ValidRenderNode> {
  private _pinhole = Posn.origin;

  constructor() {}

  /**
   * Get the bounding box of the WorldImage based on the pinhole and size.
   */
  abstract bbox(): BBox;

  /**
   * To enable node re-use, return a list of values in "preference order"
   * for nodes that can be used to render this WorldImage. If a node is being
   * re-used, it will be passed in to your reuse function along with the id.
   * If you do not want to enable node re-use, return an empty array.
   */
  abstract getReusableIds(): string[];

  /**
   * Create a node that will render your WorldImage. This will be passed into
   * prepareRender where you can set positions.
   */
  abstract createNode(ctx: RenderContext): T;

  /**
   * Return a Konva shape or group for the WorldImage drawn at the given position.
   * The position is the "top left" of the WorldImage, so you need to adjust
   * the Konva node position given the pinhole and the mechanics of the Konva node
   */
  abstract render(ctx: RenderContext, node: T, position: Posn): void;

  /**
   * OMG pinholes. So, a pinhole value of 0,0 means that the pinhole is in the
   * CENTER of the image. So the pinhole is a relative coordinate (to the center)
   * not an absolute coordinate (which one would typically consider top left in
   * the graphics world)
   */
  public get pinhole() {
    return this._pinhole;
  }

  protected set pinhole(pinhole: Posn) {
    this._pinhole = pinhole;
  }

  /**
   * Return an identical copy of your WorldImage. This is used by the
   * pinhole movement functions to create separate instances of specialized images.
   */
  abstract copy(): this;

  size() {
    return this.bbox().size();
  }

  getWidth() {
    return this.size().x;
  }

  getHeight() {
    return this.size().y;
  }

  movePinhole(dx: number | Posn, dy: number) {
    if (typeof dx === 'number') {
      return this.movePinholeTo(this.pinhole.moved(dx, dy));
    }
    return this.movePinholeTo(this.pinhole.plus(dx));
  }

  movePinholeTo(pos: Posn) {
    const copy = this.copy();
    copy.pinhole = pos;
    return copy;
  }
}
