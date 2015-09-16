'use strict';

import PIXI from 'pixi.js';
import TEXTURE from './diagnostic.png';

export default class Background extends PIXI.Container {

  constructor() {
    super();

    var bg = PIXI.Sprite.fromImage(TEXTURE);

    this.addChild(bg);
  }

}
