'use strict';

/**
 * App.js
 *
 * The main entry point, appends PIXI to the DOM
 * and starts a render and animation loop
 *
 */

import './index.html';
import PIXI from 'pixi.js';
import TWEEN from 'tween.js';

import Renderer from './Renderer/Renderer';
import App from './displayobjects/App/App.js';

var renderer = new Renderer(1920, 1080);
var app = new App(1920, 1080);

/**
 * Main animation loop
 * @todo abstract into module
 * @return {null}
 */
function animate() {
  renderer.render(app);
  window.requestAnimationFrame(animate);
  TWEEN.update();
}

document.body.appendChild(renderer.view);

animate();
