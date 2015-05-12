'use strict';

import PIXI from 'pixi.js';
import RendererStore from '../stores/RendererStore.js';

export default class Renderer extends PIXI.WebGLRenderer {

  constructor(...args) {

    super(...args);

    this.resolution = window.devicePixelRatio;

    window.addEventListener('resize', this.resizeHanlder.bind(this));
    
    RendererStore.set('resolution', this.resolution);
    
    this.setStore();

    this.resizeHanlder();
  }

  setStore() {
    RendererStore.set('width', this.getWindowSize()[0]);
    RendererStore.set('height', this.getWindowSize()[1]);
  }

  resizeHanlder() {
    this.resize(...this.getWindowSize());
    this.setStore();
    RendererStore.emitChange();
  }

  getWindowSize() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    return [width, height];
  }

}
