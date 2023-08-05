import Konva from 'konva';
import { Group } from 'konva/lib/Group';

import { AlignModeX, AlignModeY } from '../AlignMode';

import { WorldImage } from '@/WorldImage/WorldImage';
import { Posn } from '@/util';
import { RenderContext } from '@/RenderContext';
import { BBox } from '@/util/BBox';

export class OverlayOffsetAlignBase extends WorldImage<Konva.Group> {
  private _size: Posn | undefined;
  private boundingBox: BBox;
  private deltaBot: Posn;
  private deltaTop: Posn;

  constructor(
    public alignX: AlignModeX,
    public alignY: AlignModeY,
    public top: WorldImage,
    public dx: number,
    public dy: number,
    public bot: WorldImage,
  ) {
    super();

    const bottomSize = bot.size();
    const topSize = top.size();
    const [xBotMoveDist, xTopMoveDist] = [this.xBotMoveDist(), this.xTopMoveDist()];
    const [yBotMoveDist, yTopMoveDist] = [this.yBotMoveDist(), this.yTopMoveDist()];
    const rightX = Math.max(bottomSize.x / 2 + xBotMoveDist, topSize.x / 2 + xTopMoveDist);
    const leftX = Math.min(-bottomSize.x / 2 + xBotMoveDist, -topSize.x / 2 + xTopMoveDist);
    const bottomY = Math.max(bottomSize.y / 2 + yBotMoveDist, topSize.y / 2 + yTopMoveDist);
    const topY = Math.min(-bottomSize.y / 2 + yBotMoveDist, -topSize.y / 2 + yTopMoveDist);
    const centerX = (rightX + leftX) / 2;
    const centerY = (bottomY + topY) / 2;
    const botDeltaY = -centerY + yBotMoveDist;
    const topDeltaY = -centerY + yTopMoveDist;
    const botDeltaX = -centerX + xBotMoveDist;
    const topDeltaX = -centerX + xTopMoveDist;
    this.deltaBot = new Posn(botDeltaX, botDeltaY);
    this.deltaTop = new Posn(topDeltaX, topDeltaY);
    if (alignY == AlignModeY.PINHOLE && alignX == AlignModeX.PINHOLE && dx == 0.0 && dy == 0.0) {
      this.pinhole = new Posn(-centerX, -centerY);
    }
    this.boundingBox = new BBox(new Posn(leftX, topY), new Posn(rightX, bottomY));
  }

  private yBotMoveDist() {
    let moveDist = 0;
    if (this.alignY != AlignModeY.TOP && this.alignY != AlignModeY.BOTTOM) {
      if (this.alignY == AlignModeY.PINHOLE) {
        moveDist = -this.bot.pinhole.y;
      }
    } else {
      const h1 = this.top.getHeight();
      const h2 = this.bot.getHeight();
      if (this.alignY == AlignModeY.TOP) {
        moveDist = (h2 - h1) / 2.0;
      } else if (this.alignY == AlignModeY.BOTTOM) {
        moveDist = (h1 - h2) / 2.0;
      }
    }

    moveDist += this.dy;
    return moveDist;
  }

  private yTopMoveDist() {
    return this.alignY == AlignModeY.PINHOLE ? -this.top.pinhole.y : 0.0;
  }

  private xBotMoveDist() {
    let moveDist = 0.0;
    if (this.alignX != AlignModeX.LEFT && this.alignX != AlignModeX.RIGHT) {
      if (this.alignX === AlignModeX.PINHOLE) {
        moveDist = -this.bot.pinhole.x;
      }
    } else {
      const w1 = this.top.getWidth();
      const w2 = this.bot.getWidth();
      if (this.alignX === AlignModeX.LEFT) {
        moveDist = (w2 - w1) / 2.0;
      } else if (this.alignX == AlignModeX.RIGHT) {
        moveDist = (w1 - w2) / 2.0;
      }
    }

    moveDist += this.dx;
    return moveDist;
  }

  private xTopMoveDist() {
    return this.alignX == AlignModeX.PINHOLE ? -this.top.pinhole.x : 0.0;
  }

  bbox() {
    return this.boundingBox;
  }

  getReusableIds(): string[] {
    // Not yet
    return [];
  }

  createNode(ctx: RenderContext) {
    const top = this.top.createNode(ctx);
    const bottom = this.bot.createNode(ctx);
    const group = new Konva.Group({});
    group.add(bottom);
    group.add(top);
    return group;
  }

  render(ctx: RenderContext, node: Group, position: Posn): void {
    const bottom = node.children![0];
    const top = node.children![1];
    this.top.render(ctx, top, this.deltaTop);
    this.bot.render(ctx, bottom, this.deltaBot);
    node.setPosition(position.minus(this.pinhole));
  }

  size() {
    return this.bbox().size();
  }

  copy(): this {
    return new OverlayOffsetAlignBase(
      this.alignX,
      this.alignY,
      this.top,
      this.dx,
      this.dy,
      this.bot,
    ) as this;
  }
}
