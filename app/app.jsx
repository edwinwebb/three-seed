'use strict';

import './index.html';
import 'babel-core/polyfill';

import Renderer from './Renderer/Renderer';

var renderer = new Renderer();

document.body.appendChild(renderer.view);