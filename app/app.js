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
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './stores/Store';
import Main from './components/Main.jsx';

const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
const renderer = new Renderer({antialias: false}, scene, camera);
const rPass = new RenderPass(scene, camera);
const FXAA = new ShaderPass(FXAAShader);

// Post processing
renderer.addPass(rPass);
FXAA.uniforms.resolution.value.set(window.innerWidth * 2, window.innerHeight * 2);
FXAA.renderToScreen = true;
renderer.addPass(FXAA);

// Basic stores
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

// DOM
document.body.style.margin = 0;
document.body.style.overflow = 'hidden';
const reactDiv = document.createElement('div');
document.body.appendChild( reactDiv )
document.body.appendChild( renderer.domElement );

// CSS
const CSSURL = '//cdn.rawgit.com/milligram/milligram/master/dist/milligram.min.css'
const style = document.createElement('link');
style.setAttribute('href', CSSURL);
style.setAttribute('rel', 'stylesheet');
document.body.appendChild(style);

// Go Render!
renderer.start();

// React
render(
  <Provider store={store}>
    <Main />
  </Provider>,
  reactDiv
);


