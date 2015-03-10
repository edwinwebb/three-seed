'use strict';

import PIXI from 'pixi.js';
import './texture.jpg';
import './map@2x.jpg';

export default class Background extends PIXI.DisplayObjectContainer {

  constructor() {
    super();
    this.init();
  }

  init() {
    var map = PIXI.Texture.fromImage('././displayobjects/Background/map@2x.jpg');
    var bg = PIXI.Sprite.fromImage('././displayobjects/Background/texture.jpg');
    //var filter = new PIXI.NormalMapFilter(map); // Undefined?
    //bg.filters = [filter];

    this.addChild(bg);
  }

}
