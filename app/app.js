/**
 * App.js
 *
 * The main entry point, appends Three to the DOM
 * and starts a render and animation loop
 *
 */

import Renderer from './Renderer/Renderer';
import { Scene, PerspectiveCamera } from 'three';
// import * as THREE from 'three';
import TestCube from './objects/TestCube';

const renderer = new Renderer({ antialias: true });
const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
//const OrbitControls = require('three-orbit-controls')(THREE)
//new OrbitControls(camera);
const mesh = new TestCube();

scene.add(mesh);
camera.position.z = 100;

renderer.camera = camera;
renderer.scene = scene;

renderer.start();

document.body.style.margin = 0;
document.body.style.overflow = 'hidden';
document.body.appendChild( renderer.domElement );
