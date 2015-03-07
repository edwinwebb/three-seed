'use strict';

import PIXI from 'pixi.js';
import './bunny@2x.png';

export default class Bunny extends PIXI.Sprite {

  constructor() {
    var texture = PIXI.Texture.fromImage('./Bunny/bunny@2x.png');
    super(texture);
    this.init();
  }

  init() {
    this.anchor.x = .5;
    this.anchor.y = .5;
  }

}
