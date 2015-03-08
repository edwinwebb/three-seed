'use strict';

import './index.html';
import 'babel-core/polyfill';
import PIXI from 'pixi.js';

import Renderer from './Renderer/Renderer';
import App from './App/App.jsx';

var renderer = new Renderer();
var stage = new PIXI.Stage(0x111111);
var app = new App();

function animate() {
  renderer.render(stage);
  window.requestAnimationFrame(animate);
}

document.body.appendChild(renderer.view);

stage.addChild(app);

animate();
