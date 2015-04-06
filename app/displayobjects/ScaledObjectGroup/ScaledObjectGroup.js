'use strict';

import PIXI from 'pixi.js';
import RendererStore from '../../stores/RendererStore.js';
import { RESIZE } from '../../constants/AppConstants.js';

var tw = 1920;
var th = 1020;

export default class ScaledObjectGroup extends PIXI.DisplayObjectContainer {

  constructor(target_w,target_h) {

    super();

    tw = target_w || RendererStore.get('target_width');
    th = target_h || RendererStore.get('target_height');

    RendererStore.on(RESIZE, this.resizeHandler.bind(this));

    this.resizeHandler();
  }

  resizeHandler() {
    var rw = RendererStore.get('width');
    var rh = RendererStore.get('height');
    var Xratio = rw / tw;
    var Yratio = rh / th;
    var scaleRatio = rw > rh ? Xratio : Yratio;
    var scale = new PIXI.Point(scaleRatio, scaleRatio);
    var offsetX = (rw / 2) - (tw*scaleRatio / 2);
    var offsetY = (rh / 2) - (th*scaleRatio / 2);

    if(th*scaleRatio < rh) {
      scaleRatio = Yratio;
      scale = new PIXI.Point(scaleRatio, scaleRatio);
      offsetX = (rw / 2) - (tw*scaleRatio / 2);
      offsetY = (rh / 2) - (th*scaleRatio / 2);
    }

    this.position.x = offsetX;
    this.position.y = offsetY;
    this.scale = scale;
  }

}
