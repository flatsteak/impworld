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
  gameSize: Posn;
  tickCount = 0;
  position = new Posn(0, 0);
  direction = new Posn(1, 1);
  delta = new Posn(Math.random() * 10, Math.random() * 10);

  constructor(w: number, h: number) {
    super();
    this.gameSize = new Posn(w, h);
  }

  move() {
    this.position = this.position.moved(
      this.delta.x * this.direction.x,
      this.delta.y * this.direction.y,
    );
  }

  protected onKeyEvent(key: string) {
    if (key === 'ArrowLeft') {
      this.direction = new Posn(-1, this.direction.y);
    } else if (key === 'ArrowRight') {
      this.direction = new Posn(1, this.direction.y);
    } else if (key === 'ArrowUp') {
      this.direction = new Posn(this.direction.x, -1);
    } else if (key === 'ArrowDown') {
      this.direction = new Posn(this.direction.x, 1);
    } else if (key === 'r') {
      this.delta = new Posn(Math.random() * 10, Math.random() * 10);
    }
  }

  protected onGesture(name: 'swipeleft' | 'swiperight' | 'swipeup' | 'swipedown') {
    this.onKeyEvent(
      {
        swipeleft: 'ArrowLeft',
        swiperight: 'ArrowRight',
        swipeup: 'ArrowUp',
        swipedown: 'ArrowDown',
      }[name],
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
    if (this.tickCount === 10000) {
      return this.endOfWorld(`${this.tickCount} ticks are complete, game ends.`);
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
