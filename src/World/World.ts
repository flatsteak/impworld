import Konva from 'konva';
import { Posn } from '@/util/Posn';
import { WorldEnd } from '@/World/WorldEnd';
import { WorldScene } from '@/World/WorldScene';

class WorldEndMarker {
  constructor(private message: string) {}
}

type HandlerResult = void | WorldEndMarker;

export abstract class World {
  private stage?: Konva.Stage;
  private layer?: Konva.Layer;
  private size: Posn = new Posn(1000, 1000);
  private isEndOfWorld = false;
  private tickTimer?: ReturnType<typeof setInterval>;

  /**
   * Modify your game state to reflect the passage of time
   */
  protected onTick(): HandlerResult {}

  protected onKeyEvent(key: string): HandlerResult {}

  // Mouse events that can be optionally implemented
  protected onMouseClicked(pos: Posn): HandlerResult {}
  protected onMouseEntered(pos: Posn): HandlerResult {}
  protected onMouseExited(pos: Posn): HandlerResult {}
  protected onMousePressed(pos: Posn): HandlerResult {}
  protected onMouseReleased(pos: Posn): HandlerResult {}

  /**
   * Called if one of the other methods returns endOfWorld
   */
  protected lastScene?: (message: string) => WorldScene;

  getEmptyScene() {
    return new WorldScene(this.size);
  }

  bigBang(width: number, height: number, speed: number) {
    this.stage = new Konva.Stage({
      container: 'container',
      width,
      height,
    });
    this.layer = new Konva.Layer();
    this.stage.on('click', (e) => {
      const position = this.stage?.getPointerPosition();
      if (position) {
        this.onMouseClicked(new Posn(position.x, position.y));
      }
    });
    this.stage.add(this.layer);

    this.runTick();
    if (speed >= 0) {
      this.tickTimer = setInterval(() => this.runTick(), speed * 1000);
    }
  }

  private runTick() {
    if (!this.layer) {
      throw new Error('Layer not initialized');
    }
    this.layer.removeChildren();

    const result = this.onTick();
    if (result instanceof WorldEndMarker) {
      this.endTheWorld();
      return;
    }
    const scene = this.makeScene();
    if (!scene) {
      throw new Error('makeScene did not return a scene');
    }
    scene.draw(this.layer);
  }

  private endTheWorld() {
    if (this.tickTimer) {
      console.log('The world has ended');
      clearInterval(this.tickTimer);
      this.tickTimer = undefined;
      this.stage?.removeChildren();
    }
  }

  /**
   * Override to have finer grained control over when the
   * world ends.
   */
  protected worldEnds() {
    return new WorldEnd(false);
  }

  /**
   * Returning the result of this method in any of the handler
   * methods will put the world in an end-of-the-world state, displaying
   * the given message or the result of calling lastScene
   * (if implemented) and passing this message to it.
   */
  protected endOfWorld(message: string) {
    return new WorldEndMarker(message);
  }

  /**
   * The most important thing you need to override, returning
   * a scene for the current state.
   */
  abstract makeScene(): WorldScene;
}
