import {
  AboveImage,
  BesideImage,
  CircleImage,
  Color,
  OutlineMode,
  Posn,
  RectangleImage,
  RotateImage,
  TextImage,
  World,
} from '../../src/index';

export class TestWorld extends World {
  tickCount = 0;
  position = new Posn(0, 0);
  direction = new Posn(1, 1);
  delta = new Posn(Math.random(), Math.random() * 10);

  constructor(public gameSize: Posn) {
    super();
  }

  move() {
    this.position = this.position.moved(
      this.delta.x * this.direction.x,
      this.delta.y * this.direction.y,
    );
  }

  onTick() {
    this.tickCount += 1;
    const next = this.position.moved(10 * this.direction.x, 10 * this.direction.y);
    if (next.x > this.gameSize.x || next.x < 0) {
      this.direction = this.direction.times(-1, 1);
    }
    if (next.y > this.gameSize.y || next.y < 0) {
      this.direction = this.direction.times(1, -1);
    }
    this.move();
    if (this.tickCount === 1000) {
      return this.endOfWorld('1000 ticks are complete, game ends.');
    }
  }

  makeScene() {
    const scene = this.getEmptyScene();
    scene.placeImageXY(
      new CircleImage(10, OutlineMode.SOLID, new Color('#FF0000')),
      this.position.x,
      this.position.y,
    );

    const r1 = new RectangleImage(50, 50, OutlineMode.OUTLINE, Color.GREEN);
    const r2 = new RectangleImage(50, 50, OutlineMode.SOLID, Color.BLUE);
    const r3 = new RectangleImage(50, 50, OutlineMode.OUTLINE, Color.RED);
    scene.placeImageXY(
      new AboveImage(
        new BesideImage(r1, r2, r3),
        new RectangleImage(150, 50, OutlineMode.SOLID, Color.ORANGE),
        new BesideImage(
          new TextImage('Hello ', 20, Color.BLACK),
          new TextImage('World', 20, Color.BLACK),
        ),
      ),
      100,
      100,
    );
    const rp = new RectangleImage(40, 20, OutlineMode.SOLID, Color.BLACK);
    const rpp = rp.movePinhole(40, 20);
    scene.placeImageXY(rp, 0, 0);
    scene.placeImageXY(rpp, 0, 0);
    scene.placeImageXY(new CircleImage(40, OutlineMode.OUTLINE, Color.GREEN), 0, 0);

    const rotated = new RotateImage(
      new RectangleImage(50, 25, OutlineMode.SOLID, Color.BLUE),
      this.tickCount % 360,
    );
    scene.placeImageXY(rotated, 200, 200);
    return scene;
  }
}
