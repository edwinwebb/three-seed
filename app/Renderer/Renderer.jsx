'use strict';

import PIXI from 'pixi.js';

export default class Renderer extends PIXI.WebGLRenderer {

  constructor(...args) {
    this.resolution = window.devicePixelRatio;

    if(!args.length) {
      args = this.getDefaults();
    }

    super(...args);

    this.init();
  }

  init() {
    window.addEventListener('resize', this.resizeHanlder.bind(this));
  }

  resizeHanlder() {
    this.resize(...this.getWindowSize())
  }

  getWindowSize() {
    var width = window.innerWidth / this.resolution;
    var height = window.innerHeight / this.resolution;

    return [width, height];
  }

  getDefaults() {
    return [...this.getWindowSize(), {"resolution": this.resolution, "antialias" : true}];
  }

}
