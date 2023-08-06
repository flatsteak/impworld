/* eslint-disable @typescript-eslint/no-unused-vars */
import Konva from 'konva';

import { ReusableNodeCache } from './ReusableNodeCache';

import { Posn } from '@/util/Posn';
import { WorldEnd } from '@/World/WorldEnd';
import { WorldScene } from '@/World/WorldScene';
import { WorldImage } from '@/WorldImage';
import { mapKey } from '@/util/KeyMap';

class WorldEndMarker {
  constructor(public message: string) {}
}

type HandlerResult = void | WorldEndMarker;

export abstract class World {
  protected stage?: Konva.Stage;
  protected layer?: Konva.Layer;
  protected size: Posn = new Posn(1000, 1000);
  private isEndOfWorld = false;
  private tickTimer?: ReturnType<typeof setInterval>;
  private renderedNodes?: ReusableNodeCache;

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

  public htmlContainerId = 'world';

  getEmptyScene() {
    return new WorldScene(this.size);
  }

  bigBang(width: number, height: number, speed: number = 0) {
    this.stage = new Konva.Stage({
      container: this.htmlContainerId,
      width,
      height,
    });
    window.addEventListener('keydown', (e) => {
      this.onKeyEvent(mapKey(e));
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
    if (speed > 0) {
      this.tickTimer = setInterval(() => this.runTick(), speed * 1000);
    }
  }

  private runTick() {
    if (!this.layer) {
      throw new Error('Layer not initialized');
    }

    const result = this.onTick();
    if (result instanceof WorldEndMarker) {
      this.endTheWorld();
      return;
    }
    const scene = this.makeScene();
    if (!scene) {
      throw new Error('makeScene did not return a scene');
    }
    const currentNodeCache = this.renderedNodes;
    this.renderedNodes = scene.draw(this.layer, this.renderedNodes);
    currentNodeCache?.forEachNode((node) => {
      node.destroy();
    });
    currentNodeCache?.clear();
  }

  private endTheWorld() {
    if (this.tickTimer) {
      console.log('The world has ended');
      clearInterval(this.tickTimer);
      this.tickTimer = undefined;
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

export function oneShotWorld({
  htmlContainerId,
  getImage,
  width,
  height,
}: {
  htmlContainerId?: string;
  getImage: () => WorldImage;
  width?: number;
  height?: number;
}) {
  class OneShotWorld extends World {
    constructor() {
      super();
      if (htmlContainerId) {
        this.htmlContainerId = htmlContainerId;
      }
    }

    makeScene() {
      const image = getImage();
      const scene = this.getEmptyScene();
      scene.placeImageXY(image, 0, 0);
      return scene;
    }
  }

  const world = new OneShotWorld();
  const element = document.getElementById(world.htmlContainerId);
  if (element && width && height) {
    element.style.height = `${height}px`;
    element.style.width = `${width}px`;
  }
  world.bigBang(width || element?.clientWidth || 500, height || element?.clientHeight || 500);
}
