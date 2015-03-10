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
  var w = RendererStore.get('width');
  var h = RendererStore.get('height');
  var rw = w * r;
  var rh = h * r;
  var offsetX, offsetY;
  const tw = 1920;
  const th = 1080;

  console.group();
  console.log(r);
  console.log(w);
  console.log(h);
  console.log(rw);
  console.log(rh);
  console.log(app.width)
  console.log(app.scale)
  console.groupEnd();

  sizeApp(w,h,tw,th);

  //center
  offsetX = (w / 2) - (app.width / 2);
  offsetY = (h / 2) - (app.height / 2);
  app.position.x = offsetX;
  app.position.y = offsetY;
}

function sizeApp(w,h,tw,th) {
	// scale
  if(w > h && w * (th/tw) > h) {
    app.width = w;
    app.height = w * (th/tw);
  } else {
    app.width = h * (tw/th);
    app.height = h;
  }
}

RendererStore.on(RESIZE, resizeHanlder);

document.body.appendChild(renderer.view);

stage.addChild(app);

animate();
