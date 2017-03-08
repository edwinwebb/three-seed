import { WebGLRenderer } from 'three';
import RendererStore from '../stores/RendererStore.js';
import AnimationStore from '../stores/AnimationStore.js';

export default class Renderer extends WebGLRenderer {

  constructor(options, scene, camera) {
    super(options);

    this.resolution = window.devicePixelRatio;

    window.addEventListener('resize', this.resizeHandler.bind(this));

    RendererStore.set('resolution', this.resolution);

    this.setPixelRatio(this.resolution);
    this.camera = camera;
    this.scene = scene;
    this.animationToken = 0;

    this.setStore();

    this.resizeHandler();
  }

  setStore() {
    RendererStore.set('width', this.getWindowSize()[0]);
    RendererStore.set('height', this.getWindowSize()[1]);
  }

  resizeHandler() {
    const w = this.getWindowSize()[0];
    const h = this.getWindowSize()[1];

    this.setSize(w, h);

    if (this.camera) {
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }

    this.setStore();
    RendererStore.emitChange();
  }

  getWindowSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    return [width, height];
  }

  start() {
    this.active = true;
    this.animationToken = window.requestAnimationFrame(this.animate.bind(this));
  }

  stop() {
    window.cancelAnimationFrame(this.animationToken);
    this.active = false;
  }

  isRenderable() {
    return this.scene !== false && this.camera !== false;
  }

  animate() {
    if (this.active && this.isRenderable()) {
      this.render(this.scene, this.camera);
      AnimationStore.emitChange();
      window.requestAnimationFrame(this.animate.bind(this));
    }
  }

}
