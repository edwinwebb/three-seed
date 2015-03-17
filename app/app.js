'use strict';

import './index.html';
import 'babel-core/polyfill';
import PIXI from 'pixi.js';
import TWEEN from 'tween.js';

import Renderer from './Renderer/Renderer';
import App from './displayobjects/App/App.js';

var renderer = new Renderer();
var stage = new PIXI.Stage(0x333333);
var app = new App(1920, 1080); // Scaling

function animate() {
  renderer.render(stage);
  window.requestAnimationFrame(animate);
  TWEEN.update();
}

document.body.appendChild(renderer.view);

stage.addChild(app);

animate();

