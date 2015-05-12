'use strict';

import PIXI from 'pixi.js';
import Bunny from '../Bunny/Bunny.js';

export default class BunnyGroup extends PIXI.DisplayObjectContainer {

  constructor() {
    var bunny;
    var spreadX = 200;
    var spreadY = 100;
    var count = 12;

    super();

    for(let i = 0; i < count; i++) {
      bunny = new Bunny();

      bunny.position.x = Math.random() * spreadX;
      bunny.position.y = (Math.random() * spreadY * .2) + (spreadY * .8);

      this.addChild(bunny);
    }
  }
}
