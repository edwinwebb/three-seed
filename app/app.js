/**
 * App.js
 *
 * The main entry point, appends Three to the DOM
 * and starts a render and animation loop
 *
 */

import Renderer from './Renderer/Renderer';
import { Scene, PerspectiveCamera } from 'three';
import * as THREE from 'three'; // used for Orbit Controls
import TestCube from './objects/TestCube';
import Bunny from './objects/StanfordBunny/Bunny.js';
import BasicLights from './objects/BasicLights';

const renderer = new Renderer({ antialias: true });
const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
const OrbitControls = require('three-orbit-controls')(THREE)
const Bunnies = new Bunny();
const Cube = new TestCube();
const Lights = new BasicLights();

// Three JS inspector
// https://chrome.google.com/webstore/detail/threejs-inspector/dnhjfclbfhcbcdfpjaeacomhbdfjbebi?hl=en
/*
window.THREE = THREE;
window.scene = scene;
*/

// Renderer
renderer.setClearColor(0xFFFFFF);
renderer.camera = camera;
renderer.scene = scene;

// Scene
new OrbitControls(camera);

Cube.position.y = 4;
camera.position.z = 10;
camera.position.y = 1;

scene.add(Bunnies, Cube, Lights);

// Document
document.body.style.margin = 0;
document.body.style.overflow = 'hidden';
document.body.appendChild( renderer.domElement );

// Go!
renderer.start();
