'use strict';

import PIXI from 'pixi.js';
import RendererStore from '../../stores/RendererStore.js';
import { RESIZE } from '../../constants/AppConstants.js';

export default class ScaledObjectGroup extends PIXI.DisplayObjectContainer {

  constructor() {
    super();
    RendererStore.on(RESIZE, this.resizeHanlder.bind(this));
  }

  resizeHanlder() {
    var r = RendererStore.get('resolution');
    var w = RendererStore.get('width');
    var h = RendererStore.get('height');
    var rw = w * r;
    var rh = h * r;
    var offsetX, offsetY;
    const tw = 1920;
    const th = 1080;

    this.scaleDisplay(w,h,tw,th);

    //center
    offsetX = (w / 2) - (this.width / 2);
    offsetY = (h / 2) - (this.height / 2);
    this.position.x = offsetX;
    this.position.y = offsetY;
  }

  scaleDisplay(w,h,tw,th) {
    // scale
    if(w > h && w * (th/tw) > h) {
      this.width = w;
      this.height = w * (th/tw);
    } else {
      this.width = h * (tw/th);
      this.height = h;
    }
  }

}
