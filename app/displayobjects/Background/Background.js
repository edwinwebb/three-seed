'use strict';

import PIXI from 'pixi.js';
import './texture.jpg';
import './map.jpg';

export default class Background extends PIXI.DisplayObjectContainer {

  constructor() {
    super();

    var map = PIXI.Texture.fromImage('././displayobjects/Background/map.jpg');
    var bg = PIXI.Sprite.fromImage('././displayobjects/Background/texture.jpg');
    // var filter = new PIXI.NormalMapFilter(map); // Undefined?
    // var filter = new PIXI.DotScreenFilter();
    //     filter.scale = 4;
    //bg.filters = [filter];

    this.addChild(bg);
  }

}
