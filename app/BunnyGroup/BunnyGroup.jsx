'use strict';

import PIXI from 'pixi.js';
import Bunny from '../Bunny/Bunny.jsx';

export default class BunnyGroup extends PIXI.DisplayObjectContainer {

  constructor() {
    super();
    this.init();
  }

  init() {
    var bunny;

    this.spreadX = 200;
    this.spreadY = 100;
    this.count = 12;

    for(var i of this.count) {
      bunny = new Bunny();

      bunny.position.x = Math.random() * this.spreadX;
      bunny.position.y = (Math.random() * this.spreadY * .2) + (this.spreadY * .8);

      this.addChild(bunny);
    }
  }

}
