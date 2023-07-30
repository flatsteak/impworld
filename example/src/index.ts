import {
  AboveImage,
  BesideImage,
  CircleImage,
  Color,
  OutlineMode,
  Posn,
  RectangleImage,
  TextImage,
  World,
} from '../../src/index';

class TestWorld extends World {
  tickCount = 0;
  position = new Posn(0, 0);
  direction = new Posn(1, 1);
  delta = new Posn(Math.round(Math.random() * 10), Math.round(Math.random() * 10));

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
      return this.endOfWorld('Tick done');
    }
  }

  makeScene() {
    const scene = this.getEmptyScene();
    scene.placeImageXY(
      new CircleImage(10, OutlineMode.SOLID, '#FF0000'),
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
    return scene;
  }
}

const world = new TestWorld(new Posn(window.innerWidth, window.innerHeight));
world.bigBang(world.gameSize.x, world.gameSize.y, 0.01);

console.log('The world has started');
