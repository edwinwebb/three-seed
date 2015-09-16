'use strict';

import PIXI from 'pixi.js';
import Bunny from '../Bunny/Bunny.js';

export default class BunnyGroup extends PIXI.Container {

  constructor() {
    var bunny;
    var spreadX = 800;
    var spreadY = 100;
    var count = 500;

    super();

    for(let i = 0; i < count; i++) {
      bunny = new Bunny();

      bunny.position.x = (Math.random() * spreadX) - (spreadX / 2);
      bunny.position.y = -(Math.random() * spreadY * .2);

      this.addChild(bunny);
    }
  }
}
