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
import Land from './objects/Land/Land.js';
import Flower from './objects/Flower/Flower.js';
import BasicLights from './objects/BasicLights';
import { ShaderPass, RenderPass } from './Renderer/EffectRenderer';
import { FXAAShader } from './Shaders/fxaa/fxaa';
//import { TestShader } from './Shaders/test/test';

const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
const renderer = new Renderer({antialias: false}, scene, camera);
const rPass = new RenderPass(scene, camera);
const FXAA = new ShaderPass(FXAAShader);
// const c1 = new ShaderPass(TestShader);
// const c2 = new ShaderPass(TestShader);
// const c3 = new ShaderPass(TestShader);
// const c4 = new ShaderPass(TestShader);
// const c5 = new ShaderPass(TestShader);

// Post processing
renderer.addPass(rPass);

FXAA.uniforms.resolution.value.set(window.innerWidth * 2, window.innerHeight * 2)

//renderer.addPass(c5);

// c4.uniforms.COLOR.value.set(0xFF00FF);
// c4.uniforms.CENTRE.value.set(256 * 5, 256);
// renderer.addPass(c4);

// c3.uniforms.COLOR.value.set(0xFFFF00);
// c3.uniforms.CENTRE.value.set(256 * 4, 256);
// renderer.addPass(c3);

// c2.uniforms.COLOR.value.set(0xFF0000);
// c2.uniforms.CENTRE.value.set(256 * 3, 256);
// renderer.addPass(c2);

// c1.uniforms.COLOR.value.set(0x00FFFF);
// c1.uniforms.CENTRE.value.set(256 * 2, 256);

//renderer.addPass(c1);

FXAA.renderToScreen = true;
renderer.addPass(FXAA);

RendererStore.addChangeListener( (d)=>{
  const { width, height, resolution } = d;
  // set camera
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  // update the FXAA pass
  renderer.passes[6].uniforms.resolution.value.set(width * resolution, height * resolution);

} );
const OrbitControls = require('three-orbit-controls')(THREE);
const flower = new Flower();
const land = new Land();
const lights = new BasicLights();

// Three JS inspector
// https://chrome.google.com/webstore/detail/threejs-inspector/dnhjfclbfhcbcdfpjaeacomhbdfjbebi?hl=en
// window.THREE = THREE;
// window.scene = scene;

// Renderer
renderer.renderer.shadowMap.enabled = true;
renderer.renderer.shadowMap.type = PCFSoftShadowMap;
renderer.renderer.setClearColor(0x888888,1);

// Scene
new OrbitControls(camera);
scene.add(land, lights, flower);
camera.position.z = 10;
//camera.position.y = 1;

// DOM
document.body.style.margin = 0;
document.body.style.overflow = 'hidden';
document.body.appendChild( renderer.domElement );

// Go!
renderer.start();
