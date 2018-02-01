import { WebGLRenderer } from 'three';
import store from '../stores/store';
import { setRendererSize } from '../stores/RendererStore.js';

export default class Renderer extends WebGLRenderer {

  constructor(options, scene, camera) {
    super(options);

    this.resolution = window.devicePixelRatio;

    window.addEventListener('resize', this.resizeHandler.bind(this));

    this.setPixelRatio(this.resolution);
    this.camera = camera;
    this.scene = scene;
    this.animationToken = 0;

    this.setStore();

    this.resizeHandler();
  }

  setStore() {
    store.dispatch(setRendererSize(this.getWindowSize()));
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
  }

  getWindowSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    return {
      width,
      height,
      resolution: window.devicePixelRatio
    };
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
      window.requestAnimationFrame(this.animate.bind(this));
    }
  }

}
