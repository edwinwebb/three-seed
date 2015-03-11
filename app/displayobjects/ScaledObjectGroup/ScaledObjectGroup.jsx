'use strict';

import PIXI from 'pixi.js';
import RendererStore from '../../stores/RendererStore.js';
import { RESIZE } from '../../constants/AppConstants.js';

var tw = 1920;
var th = 1080;

export default class ScaledObjectGroup extends PIXI.DisplayObjectContainer {

  constructor(target_w,target_h) {

    super();

    tw = target_w || tw;
    th = target_h || th;

    RendererStore.on(RESIZE, this.resizeHandler.bind(this));

    // we can't scale until the assets are loaded. this.width is 0 until children are added/loaded.
    this.centerDisplay(RendererStore.get('width'), RendererStore.get('height'), tw, th);
  }

  resizeHandler() {
    var r = RendererStore.get('resolution');
    var w = RendererStore.get('width');
    var h = RendererStore.get('height');
    var rw = w * r;
    var rh = h * r;

    // TODO - put this back one the asset loader is place
    //this.scaleDisplay(w,h,tw,th);

    this.centerDisplay(w,h, this.width, this.height);
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

  centerDisplay(w, h, width, height) {
    var offsetX = (w / 2) - (width / 2);
    var offsetY = (h / 2) - (height / 2);
    this.position.x = offsetX;
    this.position.y = offsetY;
  }

}
