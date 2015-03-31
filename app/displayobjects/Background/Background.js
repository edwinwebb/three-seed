'use strict';

import PIXI from 'pixi.js';
import './texture.jpg';

export default class Background extends PIXI.DisplayObjectContainer {

  constructor() {
    super();

    var bg = PIXI.Sprite.fromImage('././displayobjects/Background/texture.jpg');

    this.addChild(bg);
  }

}
