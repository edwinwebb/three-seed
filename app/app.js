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

const renderer = new Renderer({ antialias: true });
const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
const OrbitControls = require('three-orbit-controls')(THREE)
const mesh = new TestCube();

new OrbitControls(camera);

scene.add(mesh);
camera.position.z = 100;

renderer.camera = camera;
renderer.scene = scene;

renderer.start();

document.body.style.margin = 0;
document.body.style.overflow = 'hidden';
document.body.appendChild( renderer.domElement );
