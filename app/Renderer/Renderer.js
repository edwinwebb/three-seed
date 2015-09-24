import PIXI from 'pixi.js';
import RendererStore from '../stores/RendererStore';
import AnimationStore from '../stores/AnimationStore';

let renderables = new Set();

export default class Renderer extends PIXI.WebGLRenderer {

  constructor(...args) {

    super(...args);

    this.resolution = window.devicePixelRatio;

    window.addEventListener('resize', this.resizeHandler.bind(this));

    RendererStore.set('resolution', this.resolution);
    RendererStore.set('stageWidth', args[0]);
    RendererStore.set('stageHeight', args[1]);
    RendererStore.set('stageCenter', new PIXI.Point(args[0] / 2, args[1] / 2));

    this.setStore();

    this.resizeHandler();
  }

  setStore() {
    RendererStore.set('width', this.getWindowSize()[0]);
    RendererStore.set('height', this.getWindowSize()[1]);
  }

  resizeHandler() {
    this.resize(...this.getWindowSize());
    this.setStore();
    RendererStore.emitChange();
  }

  getWindowSize() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    return [width, height];
  }

  start() {
    this.active = true;
    window.requestAnimationFrame(this.animate.bind(this));
  }

  stop() {
    this.active = false;
  }

  animate() {
    this.renderRenderables();

    if(this.active) {
      window.requestAnimationFrame(this.animate.bind(this));
      AnimationStore.emitChange();
    }
  }

  addRenderable(renderable) {
    return renderables.add(renderable);
  }

  removeRenderable(renderable) {
    let hasRenderable = renderables.has(renderable);

    if(hasRenderable) {
      renderables.delete(renderable);
    }

    return hasRenderable;
  }

  renderRenderables() {
    for (let entry of renderables) {
      this.render(entry);
    }
  }

}
