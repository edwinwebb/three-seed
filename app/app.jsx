'use strict';

import './index.html';
import 'babel-core/polyfill';
import PIXI from 'pixi.js';

import Renderer from './Renderer/Renderer';
import Bunny from './Bunny/Bunny';

var renderer = new Renderer();
var stage = new PIXI.Stage(0x66FF99);
var bunny = new Bunny();

function animate() {
  renderer.render(stage);
  bunny.rotation += .5;
  window.requestAnimationFrame(animate);
}

bunny.anchor.x = .5;
bunny.anchor.y = .5;

bunny.position.x = 50;
bunny.position.y = 100;

stage.addChild(bunny);

document.body.appendChild(renderer.view);

animate();
