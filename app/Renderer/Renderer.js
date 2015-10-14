import THREE from 'three';
import RendererStore from '../stores/RendererStore.js';
import AnimationStore from '../stores/AnimationStore.js';

export default class Renderer extends THREE.WebGLRenderer {

  constructor(...args) {

    super(...args);

    this.resolution = window.devicePixelRatio;

    window.addEventListener('resize', this.resizeHandler.bind(this));

    RendererStore.set('resolution', this.resolution);

    this.setPixelRatio(this.resolution);
    this.camera = false;
    this.scene = false;

    this.setStore();

    this.resizeHandler();
  }

  setStore() {
    RendererStore.set('width', this.getWindowSize()[0]);
    RendererStore.set('height', this.getWindowSize()[1]);
  }

  resizeHandler() {
    var w = this.getWindowSize()[0];
    var h = this.getWindowSize()[1];

    this.setSize(w,h);
    this.setStore();

    if(this.camera) {
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }
    
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

  isRenderable() {
    return this.scene !== false && this.camera !== false;
  }

  animate() {
    if(this.active && this.isRenderable()) {
      this.render(this.scene, this.camera);
      AnimationStore.emitChange();
      window.requestAnimationFrame(this.animate.bind(this));
    }
  }

}
