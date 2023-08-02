import {
  AboveImage,
  BesideImage,
  Color,
  EllipseImage,
  OutlineMode,
  OverlayImage,
  Posn,
  RectangleImage,
  oneShotWorld,
} from '../../src';

const tests = {
  originRect: {
    getImage() {
      return new RectangleImage(50, 50, OutlineMode.SOLID, Color.RED).movePinhole(-30, -30);
    },
    width: 60,
    height: 60,
  },
  originBeside: {
    getImage() {
      return new BesideImage(new RectangleImage(50, 50, OutlineMode.SOLID, Color.RED)).movePinhole(
        -30,
        -30,
      );
    },
    width: 60,
    height: 60,
  },
  originAbove: {
    getImage() {
      return new AboveImage(new RectangleImage(50, 50, OutlineMode.SOLID, Color.RED)).movePinhole(
        -30,
        -30,
      );
    },
    width: 60,
    height: 60,
  },
  overlay: {
    getImage() {
      return new OverlayImage(
        new RectangleImage(30, 60, OutlineMode.SOLID, Color.GREEN).movePinhole(15, 15),
        new EllipseImage(60, 30, OutlineMode.SOLID, Color.RED).movePinhole(-5, -5),
      ).movePinhole(-40, -40);
    },
    width: 160,
    height: 160,
  },
  beside: {
    getImage() {
      const r1 = new RectangleImage(50, 50, OutlineMode.SOLID, Color.RED);
      const r2 = new RectangleImage(50, 50, OutlineMode.SOLID, Color.GREEN);
      const r3 = new RectangleImage(50, 50, OutlineMode.SOLID, Color.BLUE);
      return new BesideImage(r1, r2, r3).movePinholeTo(Posn.origin);
    },
    width: 160,
    height: 60,
  },
  besideAlign: {
    getImage() {
      const r1 = new RectangleImage(50, 150, OutlineMode.SOLID, Color.RED);
      const r2 = new RectangleImage(50, 50, OutlineMode.SOLID, Color.GREEN);
      const r3 = new RectangleImage(50, 100, OutlineMode.SOLID, Color.BLUE);
      return new BesideImage(r1, r2, r3).movePinholeTo(Posn.origin);
    },
  },
} as const;

export function RunTests() {
  Object.entries(tests).forEach(([name, test]) => {
    oneShotWorld({
      htmlContainerId: name,
      ...test,
    });
  });
}
