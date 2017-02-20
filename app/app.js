/**
 * App.js
 *
 * The main entry point, appends Three to the DOM
 * and starts a render and animation loop
 *
 */

import Renderer from './Renderer/Renderer';
import Composer from './Composer/Composer';
import { Scene, PerspectiveCamera } from 'three';
import * as THREE from 'three'; // used for Orbit Controls
import TestCube from './objects/TestCube';
import { RenderPass, ShaderPass } from 'three-effectcomposer-es6';
import { FXAAShader } from './Shaders/fxaa/fxaa';
import { Grain } from './Shaders/grain/grain';

const renderer = new Renderer({antialias: false, alpha: true});
const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
const OrbitControls = require('three-orbit-controls')(THREE)
const mesh = new TestCube();
const composer = new Composer(renderer);
const FXAA = new ShaderPass(FXAAShader);
const grain = new ShaderPass(Grain);

new OrbitControls(camera);

scene.add(mesh);
camera.position.z = 100;

renderer.camera = camera;
renderer.scene = scene;

FXAA.renderToScreen = true;
grain.renderToScreen = true;
composer.addPass(new RenderPass(scene, camera));
composer.addPass(FXAA);
//composer.addPass(grain);

window.composer = composer;

renderer.start();

document.body.style.margin = 0;
document.body.style.overflow = 'hidden';
document.body.appendChild( renderer.domElement );
