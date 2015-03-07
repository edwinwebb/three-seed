'use strict';

import './index.html';
import 'babel-core/polyfill';
import PIXI from 'pixi.js';

import Renderer from './Renderer/Renderer';
import BunnyGroup from './BunnyGroup/BunnyGroup.jsx';

var renderer = new Renderer();
var stage = new PIXI.Stage(0x66FF99);
var group1 = new BunnyGroup();
var group2 = new BunnyGroup();

function animate() {
  renderer.render(stage);
  window.requestAnimationFrame(animate);
}

group1.position.x = 50;

stage.addChild(group1);
stage.addChild(group2);

document.body.appendChild(renderer.view);

animate();
