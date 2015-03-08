'use strict';

import PIXI from 'pixi.js';
import BunnyGroup from '../BunnyGroup/BunnyGroup.jsx';

export default class App extends PIXI.DisplayObjectContainer {

  constructor() {
    super();
    this.init();
  }

  init() {
    var group1 = new BunnyGroup();
    var group2 = new BunnyGroup();

    group1.position.x = 100;
    group1.scale.x = 2;
    group1.scale.y = 2;

    this.addChild(group1);
    this.addChild(group2);
  }

}
