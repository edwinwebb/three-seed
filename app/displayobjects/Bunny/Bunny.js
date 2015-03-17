'use strict';

import TWEEN from 'tween.js';
import PIXI from 'pixi.js';
import './bunny.png';

export default class Bunny extends PIXI.Sprite {

  constructor() {
    var texture = PIXI.Texture.fromImage('./displayobjects/Bunny/bunny.png');

    super(texture);

    this.interval = 0;
    this.anchor.x = .5;
    this.anchor.y = .5;
    this.interactive = true;
  }

  startWobble() {
    var position = this;
    var tween = new TWEEN.Tween(position);
    tween.to({rotation: 6.2}, 1000);
    tween.start();
  }

  mouseover(event) {
    clearInterval(this.interval);
    this.startWobble();
  }

}
