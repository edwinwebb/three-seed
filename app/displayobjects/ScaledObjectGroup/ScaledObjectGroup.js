/**
 * ScaledObjectGroup
 *
 * A DisplayObjectContainer which attempts to scale and best-fit into the
 * window size dispatched from the RendererStrore
 *
 * @extends Container
 * @exports ScaledObjectGroup
 */

import PIXI from 'pixi.js';
import RendererStore from '../../stores/RendererStore.js';
import { RESIZE } from '../../constants/AppConstants.js';

// default target size
var tw = 1920;
var th = 1080;

export default class ScaledObjectGroup extends PIXI.Container {

  constructor(target_w,target_h) {

    super();

    tw = target_w || RendererStore.get('target_width');
    th = target_h || RendererStore.get('target_height');

    RendererStore.on(RESIZE, this.resizeHandler.bind(this));

    this.resizeHandler();
  }

  resizeHandler() {
    const rw = RendererStore.get('width');
    const rh = RendererStore.get('height');
    const Xratio = rw / tw;
    const Yratio = rh / th;
    let scaleRatio = rw > rh ? Xratio : Yratio;
    let scale = new PIXI.Point(scaleRatio, scaleRatio);
    let offsetX = (rw / 2) - (tw*scaleRatio / 2);
    let offsetY = (rh / 2) - (th*scaleRatio / 2);

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
