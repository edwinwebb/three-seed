'use strict';

import PIXI from 'pixi.js';
import './bunny.png';

export default class Bunny extends PIXI.Sprite {

  constructor() {
    var texture = PIXI.Texture.fromImage('./Bunny/bunny.png');
    super(texture);
    this.init();
  }

  init() {
    this.anchor.x = .5;
    this.anchor.y = .5;
  }

}
