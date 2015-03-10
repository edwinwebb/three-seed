'use strict';

import './index.html';
import 'babel-core/polyfill';
import PIXI from 'pixi.js';

import Renderer from './Renderer/Renderer';
import App from './displayobjects/App/App.jsx';
import RendererStore from './stores/RendererStore.js';
import { RESIZE } from './constants/AppConstants.js';

var renderer = new Renderer();
var stage = new PIXI.Stage(0x333333);
var app = new App();

function animate() {
  renderer.render(stage);
  window.requestAnimationFrame(animate);
}

function resizeHanlder(data) {
  var r = RendererStore.get('resolution');
  var w = RendererStore.get('width') * r;
  var h = RendererStore.get('height') * r;
  var width, height;
  const tw = 1920;
  const th = 1080;

  // scale
  if(w > h) {
    app.width = w;
    app.height = w * (th/tw);
  } else {
    app.width = h * (tw/th);
    app.height = h;
  }

  //center
  width = (w / 2) - (app.width / 2);
  height = (h / 2) - (app.height / 2);

  app.position.x = width / 2;
  app.position.y = height / 2;

}

RendererStore.on(RESIZE, resizeHanlder);

document.body.appendChild(renderer.view);

stage.addChild(app);

animate();
