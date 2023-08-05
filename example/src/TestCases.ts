import {
  AboveImage,
  BesideImage,
  CircleImage,
  Color,
  EllipseImage,
  OutlineMode,
  OverlayImage,
  Posn,
  RectangleImage,
  oneShotWorld,
} from '../../src';

const solo = undefined; // 'originBeside';
const tests = {
  originCircle: {
    getImage() {
      return new CircleImage(50, OutlineMode.SOLID, Color.RED).movePinhole(-55, -55);
    },
    width: 110,
    height: 110,
  },
  originRect: {
    getImage() {
      return new RectangleImage(100, 100, OutlineMode.SOLID, Color.RED).movePinhole(-55, -55);
    },
    width: 110,
    height: 110,
  },
  originBeside: {
    getImage() {
      return new BesideImage(
        new RectangleImage(100, 100, OutlineMode.SOLID, Color.RED),
      ).movePinhole(-55, -55);
    },
    width: 110,
    height: 110,
  },
  originAbove: {
    getImage() {
      return new AboveImage(new RectangleImage(100, 100, OutlineMode.SOLID, Color.RED)).movePinhole(
        -55,
        -55,
      );
    },
    width: 110,
    height: 110,
  },
  overlay: {
    getImage() {
      return new OverlayImage(
        new RectangleImage(30, 60, OutlineMode.SOLID, Color.GREEN),
        new EllipseImage(60, 30, OutlineMode.SOLID, Color.RED),
      ).movePinhole(-40, -40);
    },
    width: 80,
    height: 80,
  },
  beside: {
    getImage() {
      const r1 = new RectangleImage(50, 50, OutlineMode.SOLID, Color.RED);
      const r2 = new RectangleImage(50, 50, OutlineMode.SOLID, Color.GREEN);
      const r3 = new RectangleImage(50, 50, OutlineMode.SOLID, Color.BLUE);
      return new BesideImage(r1, r2, r3).movePinhole(-80, -30);
    },
    width: 160,
    height: 60,
  },
  besideReused: {
    getImage() {
      const r1 = new RectangleImage(50, 50, OutlineMode.SOLID, Color.BLACK);
      const r2 = new RectangleImage(50, 50, OutlineMode.SOLID, Color.BLACK.add(40));
      const r3 = new RectangleImage(50, 50, OutlineMode.SOLID, Color.BLACK.add(80));
      const r4 = new RectangleImage(50, 50, OutlineMode.SOLID, Color.BLACK.add(120));
      const r5 = new RectangleImage(50, 50, OutlineMode.SOLID, Color.BLACK.add(160));
      const r6 = new RectangleImage(50, 50, OutlineMode.SOLID, Color.BLACK.add(200));
      return new BesideImage(r1, r2, r3, r4, r5, r6).movePinhole(-160, -30);
    },
    width: 320,
    height: 60,
  },
  besideAlign: {
    getImage() {
      const r1 = new RectangleImage(50, 150, OutlineMode.OUTLINE, Color.RED);
      const r2 = new RectangleImage(50, 50, OutlineMode.SOLID, Color.GREEN);
      const r3 = new RectangleImage(50, 100, OutlineMode.OUTLINE, Color.BLUE);
      return new BesideImage(r1, r2, r3).movePinholeTo(new Posn(-80, -80));
    },
    width: 160,
    height: 160,
  },
} as const;

export function RunTests() {
  Object.entries(tests)
    .filter(([name]) => !solo || solo === name)
    .forEach(([name, test]) => {
      if (document.getElementById(name)) {
        oneShotWorld({
          htmlContainerId: name,
          ...test,
        });
      }
    });
}
