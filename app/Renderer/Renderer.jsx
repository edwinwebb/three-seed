'use strict';

import PIXI from 'pixi.js';

export default class Renderer extends PIXI.WebGLRenderer {

  constructor(...args) {
    if(!args.length) {
      args = this.getDefaults();
    }
    super(...args);
  }

  getDefaults() {
    var resolution = window.devicePixelRatio;
    var width = window.innerWidth / resolution;
    var height = window.innerHeight / resolution;

    return [width, height, {"resolution":resolution, "antialias" : true}];
  }

}
