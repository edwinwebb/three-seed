'use strict';

import PIXI from 'pixi.js';
import ScaledObjectGroup from '../ScaledObjectGroup/ScaledObjectGroup.jsx';
import BunnyGroup from '../BunnyGroup/BunnyGroup.jsx';
import Background from '../Background/Background.jsx';

export default class App extends ScaledObjectGroup {

  constructor() {
    super();
    this.init();
  }

  init() {
    var bg = new Background();
    this.addChild(bg);

    this.addBunnies();
  }

  addBunnies() {
    var group1 = new BunnyGroup();
    var group2 = new BunnyGroup();

    group1.position.x = 100;
    group1.scale.x = 2;
    group1.scale.y = 2;

    this.addChild(group1);
    this.addChild(group2);
  }

}
