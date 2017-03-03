/**
 * App.js
 *
 * The main entry point, appends Three to the DOM
 * and starts a render and animation loop
 *
 */

import Renderer from './Renderer/EffectRenderer';
import { Scene, PerspectiveCamera, HemisphereLight } from 'three';
// import * as THREE from 'three'; // used for Orbit Controls
import TestCube from './objects/TestKnot';
import { ShaderPass, RenderPass, CopyShader, ColorifyShader, ClearPass, TestShader } from './Renderer/EffectRenderer';
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
const copy2 = new ShaderPass(CopyShader);
const copy3 = new ShaderPass(CopyShader);
const colori = new ShaderPass(ColorifyShader);
const clear = new ClearPass(0xFF00FF, 0.5);
const test = new ShaderPass(TestShader)

const light = new HemisphereLight(0xFFFFFF, 0x222222, 1);
scene.add(light);
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
// console.log(SSAO)
// renderer.addPass(SSAO);

//FXAA.renderToScreen = true;
// renderer.addPass(FXAA);

// // colori.renderToScreen = true;
// colori.uniforms.color.value.set(0xFF00FF)
// renderer.addPass(colori);

// // clear.renderToScreen = true;
// renderer.addPass(clear);

// rPass.clear = false;
renderer.addPass(rPass);

// renderer.addPass(copy3);
// copy3.uniforms.opacity.value = 0.75;

// //copy.renderToScreen = true;
// renderer.addPass(copy);
// copy.uniforms.opacity.value = 0.75;
// //console.log()

// renderer.addPass(test);

copy2.renderToScreen = true;
renderer.addPass(copy2);

// window.composer = composer;

renderer.start();

// document.body.addEventListener('click', e => (renderer.render()) );

document.body.style.margin = 0;
document.body.style.overflow = 'hidden';
document.body.appendChild( renderer.domElement );
