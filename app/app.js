/**
 * App.js
 *
 * The main entry point, appends Three to the DOM
 * and starts a render and animation loop
 *
 */

import Renderer from './Renderer/EffectRenderer';
// import Composer from './Composer/Composer';
import { Scene, PerspectiveCamera } from 'three';
// import * as THREE from 'three'; // used for Orbit Controls
import TestCube from './objects/TestKnot';
import { ShaderPass, RenderPass, CopyShader, ColorifyShader, ClearPass } from './Renderer/EffectRenderer';
import { FXAAShader } from './Shaders/fxaa/fxaa';
import { SSAOShader } from './Shaders/ssao/ssao';
import { Grain } from './Shaders/grain/grain';

const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
const renderer = new Renderer({antialias: false, alpha: false}, scene, camera);
//const OrbitControls = require('three-orbit-controls')(THREE)
const mesh = new TestCube();
// const composer = new Composer(renderer);
const rPass = new RenderPass(scene, camera);
const FXAA = new ShaderPass(FXAAShader);
const SSAO = new ShaderPass(SSAOShader);
const grain = new ShaderPass(Grain);
const copy = new ShaderPass(CopyShader);
const colori = new ShaderPass(ColorifyShader);
const clear = new ClearPass(0xFF0000, 0.5);

// new OrbitControls(camera);

scene.add(mesh);
camera.position.z = 100;
//renderer.addPass(rPass);

//
// x.renderToScreen = true;
// grain.renderToScreen = true;
// renderer.addPass(grain);
// // composer.addPass(new RenderPass(scene, camera));

// SSAO.renderToScreen = true;
// renderer.addPass(SSAO);

// FXAA.renderToScreen = true;
// renderer.addPass(FXAA);

// colori.renderToScreen = true;
// renderer.addPass(colori);

// clear.renderToScreen = true;
// renderer.addPass(clear);

copy.renderToScreen = true;
renderer.addPass(copy);
// window.composer = composer;

renderer.start();

document.body.style.margin = 0;
document.body.style.overflow = 'hidden';
document.body.appendChild( renderer.domElement );
