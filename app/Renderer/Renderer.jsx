'use strict';

import PIXI from 'pixi.js';
import RendererStore from '../stores/RendererStore.js';

export default class Renderer extends PIXI.WebGLRenderer {

  constructor(...args) {

    this.resolution = window.devicePixelRatio;

    if(!args.length) {
      args = this.getDefaults();
    }

    super(...args);

    this.initRenderer();
  }

  initRenderer() {
    window.addEventListener('resize', this.resizeHanlder.bind(this));
    RendererStore.set('resolution', this.resolution);
    this.setStore();
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

  getDefaults() {
    return [...this.getWindowSize(), {"resolution": this.resolution, "antialias" : true}];
  }

}
