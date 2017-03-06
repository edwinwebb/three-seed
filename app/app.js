/**
 * App.js
 *
 * The main entry point, appends Three to the DOM
 * and starts a render and animation loop
 *
 */

import Renderer from './Renderer/EffectRenderer';
import RendererStore from './stores/RendererStore';
import { Scene, PerspectiveCamera, PCFSoftShadowMap } from 'three';
import * as THREE from 'three'; // used for Orbit Controls
import Bunny from './objects/StanfordBunny/Bunny.js';
import BasicLights from './objects/BasicLights';
import TestCube from './objects/TestKnot';
import { ShaderPass, RenderPass, CopyShader, ColorifyShader, ClearPass, TestShader, BasicShader } from './Renderer/EffectRenderer';
import { FXAAShader } from './Shaders/fxaa/fxaa';
import { SSAOShader } from './Shaders/ssao/ssao';
import { Grain } from './Shaders/grain/grain';

const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
const renderer = new Renderer({antialias: false, alpha: false}, scene, camera);
//const OrbitControls = require('three-orbit-controls')(THREE)
const mesh = new TestCube();
const rPass = new RenderPass(scene, camera);
const FXAA = new ShaderPass(FXAAShader);
const SSAO = new ShaderPass(SSAOShader);
const grain = new ShaderPass(Grain);
const copy = new ShaderPass(CopyShader);
const copy2 = new ShaderPass(CopyShader);
const copy3 = new ShaderPass(CopyShader);
const colori = new ShaderPass(ColorifyShader);
const clear = new ClearPass(0xFF00FF, 0.5);
const test = new ShaderPass(TestShader);
const basic = new ShaderPass(BasicShader)

// // Add a renderer pass
renderer.addPass(rPass);

// basic.renderToScreen = true;
renderer.addPass(test);


// // SSAO.renderToScreen = true;
// // console.log(SSAO)
// // renderer.addPass(SSAO);

// //
// //
// // x.renderToScreen = true;
// // grain.renderToScreen = true;
// // renderer.addPass(grain);
// // // composer.addPass(new RenderPass(scene, camera));

// // SSAO.renderToScreen = true;
// // console.log(SSAO)
// // renderer.addPass(SSAO);

// //FXAA.renderToScreen = true;
// // renderer.addPass(FXAA);

// // // colori.renderToScreen = true;
// // colori.uniforms.color.value.set(0xFF00FF)
// // renderer.addPass(colori);

// // // clear.renderToScreen = true;
// // renderer.addPass(clear);

// // rPass.clear = false;
// // renderer.addPass(rPass);

// // renderer.addPass(copy3);
// // copy3.uniforms.opacity.value = 0.75;

// // //copy.renderToScreen = true;
// // renderer.addPass(copy);
// // copy.uniforms.opacity.value = 0.75;
// // //console.log()

// // renderer.addPass(test);

copy2.renderToScreen = true;
renderer.addPass(copy2);

// window.composer = composer;

RendererStore.addChangeListener( (d)=>{
  const { width, height } = d;
  rPass.camera.aspect = width / height;
  rPass.camera.updateProjectionMatrix();
} );
const OrbitControls = require('three-orbit-controls')(THREE)
const Bunnies = new Bunny();
const Lights = new BasicLights();

// Three JS inspector
// https://chrome.google.com/webstore/detail/threejs-inspector/dnhjfclbfhcbcdfpjaeacomhbdfjbebi?hl=en
// window.THREE = THREE;
// window.scene = scene;

// Renderer
renderer.renderer.shadowMap.enabled = true;
renderer.renderer.shadowMap.type = PCFSoftShadowMap;
// renderer.camera = camera;
// renderer.scene = scene;

// Scene
new OrbitControls(camera);
scene.add(Bunnies, Lights);
camera.position.z = 10;
camera.position.y = 1;

// DOM
document.body.style.margin = 0;
document.body.style.overflow = 'hidden';
document.body.appendChild( renderer.domElement );

// Go!
renderer.start();
