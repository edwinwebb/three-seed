'use strict';

import './index.html';
import 'babel-core/polyfill';

import PIXI from 'pixi.js';

var renderer = new PIXI.CanvasRenderer(1024, 768);

document.body.appendChild(renderer.view);