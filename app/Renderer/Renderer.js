'use strict';

import PIXI from 'pixi.js';
import RendererStore from '../stores/RendererStore.js';

export default class Renderer extends PIXI.WebGLRenderer {

  constructor(...args) {

    super(...args);

    this.resolution = window.devicePixelRatio;

    window.addEventListener('resize', this.resizeHandler.bind(this));

    RendererStore.set('resolution', this.resolution);
    RendererStore.set('stageWidth', args[0]);
    RendererStore.set('stageHeight', args[1]);
    RendererStore.set('stageCenter', new PIXI.Point(args[0] / 2, args[1] / 2));

    this.setStore();

    this.resizeHandler();
  }

  setStore() {
    RendererStore.set('width', this.getWindowSize()[0]);
    RendererStore.set('height', this.getWindowSize()[1]);
  }

  resizeHandler() {
    this.resize(...this.getWindowSize());
    this.setStore();
    RendererStore.emitChange();
  }

  getWindowSize() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    return [width, height];
  }

}
