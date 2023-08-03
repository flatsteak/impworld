import Konva from 'konva';

import { AlignModeX, AlignModeY } from '../AlignMode';

import { EmptyImage } from '@/WorldImage/EmptyImage';
import { WorldImage } from '@/WorldImage/WorldImage';
import { Posn } from '@/util';
import { RenderContext } from '@/RenderContext';
import { BBox } from '@/util/BBox';

export class OverlayOffsetAlignBase extends WorldImage<Konva.Group> {
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

  preRender(ctx: RenderContext): void {
    this.top.preRender(ctx);
    this.bot.preRender(ctx);
  }

  render(ctx: RenderContext, position: Posn) {
    const pinhole = this.pinhole;
    const group = new Konva.Group({
      x: position.x - pinhole.x,
      y: position.y - pinhole.y,
    });
    group.add(this.bot.render(ctx, this.deltaBot));
    group.add(this.top.render(ctx, this.deltaTop));
    this.node = group;
    return group;
  }

  size() {
    const { x: botWidth, y: botHeight } = this.bot.size();
    const { x: topWidth, y: topHeight } = this.top.size();
    const botStart = this.deltaBot;
    const topStart = this.deltaTop;
    const leftX = Math.min(botStart.x, topStart.x);
    const rightX = Math.max(botStart.x + botWidth, topStart.x + topWidth);
    const topY = Math.min(botStart.y, topStart.y);
    const bottomY = Math.max(botStart.y + botHeight, topStart.y + topHeight);
    return new Posn(rightX - leftX, bottomY - topY);
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

export class OverlayImage extends OverlayOffsetAlignBase {
  constructor(top: WorldImage, bottom: WorldImage) {
    super(AlignModeX.PINHOLE, AlignModeY.PINHOLE, top, 0, 0, bottom);
  }
}

export class BesideImage extends OverlayOffsetAlignBase {
  constructor(left: WorldImage, right: WorldImage = new EmptyImage(), ...rest: WorldImage[]) {
    const rightFolded =
      rest.length > 0
        ? new BesideImage(right, rest[0], ...rest.slice(1))
        : right || new EmptyImage();
    const sz1 = left.size();
    const sz2 = rightFolded.size();
    super(AlignModeX.PINHOLE, AlignModeY.PINHOLE, left, sz1.x / 2 + sz2.x / 2, 0, rightFolded);
  }

  copy() {
    return new BesideImage(this.top, this.bot) as this;
  }
}

export class AboveImage extends OverlayOffsetAlignBase {
  constructor(top: WorldImage, bottom: WorldImage = new EmptyImage(), ...rest: WorldImage[]) {
    const bottomFolded =
      rest.length > 0
        ? new AboveImage(bottom, rest[0], ...rest.slice(1))
        : bottom || new EmptyImage();
    const sz1 = top.size();
    const sz2 = bottomFolded.size();
    super(AlignModeX.PINHOLE, AlignModeY.PINHOLE, top, 0, sz1.y / 2 + sz2.y / 2, bottomFolded);
  }

  copy() {
    return new AboveImage(this.top, this.bot) as this;
  }
}

export class BesideAlignImage extends OverlayOffsetAlignBase {
  constructor(
    alignY: AlignModeY,
    left: WorldImage,
    right: WorldImage = new EmptyImage(),
    ...rest: WorldImage[]
  ) {
    const rightFolded =
      rest.length > 0
        ? new BesideImage(right, rest[0], ...rest.slice(1))
        : right || new EmptyImage();
    const sz1 = left.size();
    const sz2 = rightFolded.size();
    super(AlignModeX.PINHOLE, alignY, left, sz1.x / 2 + sz2.x / 2, 0, rightFolded);
  }

  copy() {
    return new BesideAlignImage(this.alignY, this.top, this.bot) as this;
  }
}

export class AboveAlignImage extends OverlayOffsetAlignBase {
  constructor(alignX: AlignModeX, top: WorldImage, bottom: WorldImage, ...rest: WorldImage[]) {
    const bottomFolded =
      rest.length > 0
        ? new AboveImage(bottom, rest[0], ...rest.slice(1))
        : bottom || new EmptyImage();
    const sz1 = top.size();
    const sz2 = bottomFolded.size();
    super(alignX, AlignModeY.PINHOLE, top, 0, sz1.y / 2 + sz2.y / 2, bottomFolded);
  }

  copy() {
    return new AboveAlignImage(this.alignX, this.top, this.bot) as this;
  }
}
