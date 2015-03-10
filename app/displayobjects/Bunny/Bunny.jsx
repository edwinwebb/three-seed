'use strict';

import PIXI from 'pixi.js';
import './bunny.png';

export default class Bunny extends PIXI.Sprite {

  constructor() {
    var texture = PIXI.Texture.fromImage('./displayobjects/Bunny/bunny.png');
    
    super(texture);

    this.interval = 0;
    this.anchor.x = .5;
    this.anchor.y = .8;
    this.interactive = true;
  }

  startWobble() {
    this.wobbles = 6;
    this.interval = setInterval(this.wobble.bind(this), 400 / this.wobbles);
  }

  wobble() {
    this.rotation = Math.random() - .5;
    this.wobbles = this.wobbles - 1;

    if(this.wobbles === 0) {
      clearInterval(this.interval);
    }
  }

  mouseover(event) {
    clearInterval(this.interval);
    this.startWobble(); 
  }

}
