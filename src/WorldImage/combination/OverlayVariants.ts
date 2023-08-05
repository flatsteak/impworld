import { AlignModeX, AlignModeY } from '../AlignMode';
import { WorldImage } from '../WorldImage';

import { OverlayOffsetAlignBase } from './OverlayOffsetAlignBase';

import { EmptyImage } from '@/WorldImage/EmptyImage';

export class OverlayImage extends OverlayOffsetAlignBase {
  constructor(top: WorldImage, bottom: WorldImage) {
    super(AlignModeX.PINHOLE, AlignModeY.PINHOLE, top, 0, 0, bottom);
  }
}

export class OverlayOffsetAlign extends OverlayOffsetAlignBase {
  constructor(
    alignX: AlignModeX,
    alignY: AlignModeY,
    top: WorldImage,
    dx: number,
    dy: number,
    bottom: WorldImage,
  ) {
    super(alignX, alignY, top, dx, dy, bottom);
  }

  copy() {
    return new OverlayOffsetAlign(
      this.alignX,
      this.alignY,
      this.top,
      this.dx,
      this.dy,
      this.bot,
    ) as this;
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
    super(AlignModeX.PINHOLE, AlignModeY.PINHOLE, left, sz1.x / 2 + sz2.x / 2 + 1, 0, rightFolded);
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
    super(AlignModeX.PINHOLE, AlignModeY.PINHOLE, top, 0, sz1.y / 2 + sz2.y / 2 + 1, bottomFolded);
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
    super(AlignModeX.PINHOLE, alignY, left, sz1.x / 2 + sz2.x / 2 + 1, 0, rightFolded);
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
    super(alignX, AlignModeY.PINHOLE, top, 0, sz1.y / 2 + sz2.y / 2 + 1, bottomFolded);
  }

  copy() {
    return new AboveAlignImage(this.alignX, this.top, this.bot) as this;
  }
}
