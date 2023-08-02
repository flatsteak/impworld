import Konva from 'konva';
import { Posn } from '@/util/Posn';
import { RenderContext } from '@/RenderContext';
import { BBox } from '@/util/BBox';

type ValidChild = Konva.Shape | Konva.Group;

export abstract class WorldImage<T extends ValidChild = ValidChild> {
  protected node?: T;
  private _pinhole?: Posn;

  constructor() {}

  public get pinhole() {
    return this._pinhole || this.size().dividedBy(2);
  }

  protected set pinhole(pinhole: Posn) {
    this._pinhole = pinhole;
  }

  /**
   * Get the bounding box of the WorldImage based on the pinhole and size.
   */
  abstract bbox(): BBox;

  /**
   * If your WorldImage has to do some "non-trivial" things before rendering,
   * put them here. This allows you to be lazy in the constructor and only
   * create nodes and such when you know you will be rendered. Note this may
   * be called multiple times on your WorldImage, so make sure it caches or
   * does what is necessary to avoid too much work.
   */
  abstract preRender(ctx: RenderContext): void;

  /**
   * Return a Konva shape or group for the WorldImage drawn at the given position.
   * The position is the "top left" of the WorldImage, so you need to adjust
   * the Konva node position given the pinhole and the mechanics of the Konva node
   */
  abstract render(ctx: RenderContext, position: Posn): ValidChild;

  /**
   * Return an identical copy of your WorldImage. This is used by the
   * pinhole movement functions to create separate instances of specialized images.
   */
  abstract copy(): this;

  protected getNode(): T {
    return this.node as T;
  }

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
