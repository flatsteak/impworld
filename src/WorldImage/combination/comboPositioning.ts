import { AlignModeX, AlignModeY, CombinationDirection, WorldImage } from '@/WorldImage';
import { Posn } from '@/util';

function ltrSize(objects: WorldImage[], alignX: AlignModeX, alignY: AlignModeY) {
  let width = 0;
  let height = 0;
  for (const obj of objects) {
    const sz = obj.size();
    width += sz.x;
    height = Math.max(height, sz.y);
  }
  return new Posn(width, height);
}

function ttbSize(objects: WorldImage[], alignX: AlignModeX, alignY: AlignModeY) {
  let width = 0;
  let height = 0;
  for (const obj of objects) {
    const sz = obj.size();
    width = Math.max(width, sz.x);
    height += sz.y;
  }
  return new Posn(width, height);
}

function overlaySize(objects: WorldImage[], alignX: AlignModeX, alignY: AlignModeY) {
  let width = 0;
  let height = 0;
  for (const obj of objects) {
    const sz = obj.size();
    width = Math.max(width, sz.x);
    height = Math.max(sz.y);
  }
  return new Posn(width, height);
}

export function getSize(
  objects: WorldImage[],
  direction: CombinationDirection,
  alignX: AlignModeX,
  alignY: AlignModeY,
): Posn {
  switch (direction) {
    case CombinationDirection.LeftToRight:
      return ltrSize(objects, alignX, alignY);
    case CombinationDirection.TopToBottom:
      return ttbSize(objects, alignX, alignY);
    case CombinationDirection.Overlay:
      return overlaySize(objects, alignX, alignY);
  }
}

function ltrPositions(objects: WorldImage[], alignY: AlignModeY) {
  let spot = Posn.origin;
  const positions: Posn[] = [];
  for (const obj of objects) {
    const sz = obj.size();
    switch (alignY) {
      case AlignModeY.PINHOLE:
        positions.push(spot);
        spot = spot.moved(sz.x, 0);
        break;
      case AlignModeY.TOP:
        positions.push(spot.minus(new Posn(0, sz.y / 2)));
        spot = spot.moved(sz.x, 0);
        break;
      case AlignModeY.BOTTOM:
        positions.push(spot.plus(new Posn(0, sz.y / 2)));
        spot = spot.moved(sz.x, 0);
        break;
      case AlignModeY.MIDDLE:
        positions.push(spot);
        spot = spot.moved(sz.x, 0);
        break;
    }
  }
  return positions;
}

function ttbPositions(objects: WorldImage[], alignX: AlignModeX) {
  let spot = Posn.origin;
  const positions: Posn[] = [];
  for (const obj of objects) {
    const sz = obj.size();
    switch (alignX) {
      case AlignModeX.PINHOLE:
        positions.push(spot);
        spot = spot.moved(0, sz.y);
        break;
      case AlignModeX.LEFT:
        positions.push(spot.minus(new Posn(sz.x / 2, 0)));
        spot = spot.moved(0, sz.y);
        break;
      case AlignModeX.RIGHT:
        positions.push(spot.plus(new Posn(sz.x / 2, 0)));
        spot = spot.moved(0, sz.y);
        break;
      case AlignModeX.CENTER:
        positions.push(spot);
        spot = spot.moved(0, sz.y);
        break;
    }
  }
  return positions;
}

function overlayPositions(objects: WorldImage[], alignX: AlignModeX, alignY: AlignModeY) {
  const spot = Posn.origin;
  const positions: Posn[] = [];
  for (const obj of objects) {
    positions.push(obj.size());
  }
  return positions;
}

export function getPositions(
  objects: WorldImage[],
  direction: CombinationDirection,
  alignX: AlignModeX,
  alignY: AlignModeY,
): Posn[] {
  switch (direction) {
    case CombinationDirection.LeftToRight:
      return ltrPositions(objects, alignY);
    case CombinationDirection.TopToBottom:
      return ttbPositions(objects, alignX);
    case CombinationDirection.Overlay:
      return overlayPositions(objects, alignX, alignY);
  }
}
