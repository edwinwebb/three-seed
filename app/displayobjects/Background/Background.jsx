'use strict';

import PIXI from 'pixi.js';
import RendererStore from '../../stores/RendererStore.js';
import { RESIZE } from '../../constants/AppConstants.js';
import './texture@2x.jpg';
import './map@2x.jpg';

export default class Background extends PIXI.DisplayObjectContainer {

  constructor() {
    super();
    this.init();
    RendererStore.on(RESIZE, this.resizeHanlder);
  }

  init() {
    var map = PIXI.Texture.fromImage('././displayobjects/Background/texture@2x.jpg');
    var bg = PIXI.Sprite.fromImage('././displayobjects/Background/texture@2x.jpg');
    //var filter = new PIXI.NormalMapFilter(map);
    //bg.filters = [filter];

    this.addChild(bg);
  }

  resizeHanlder(data) {
    console.log(data);
  }

}
