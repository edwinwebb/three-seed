/**
 * App.js
 *
 * The main entry point, appends Three to the DOM
 * and starts a render and animation loop
 *
 */

import Renderer from './Renderer/Renderer';
import {Scene, PerspectiveCamera, BoxGeometry, MeshNormalMaterial, Mesh } from 'three';
import * as THREE from 'three';
import TWEEN from 'gsap';

const renderer = new Renderer({ antialias: true });
const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
const OrbitControls = require('three-orbit-controls')(THREE)

const geometry = new BoxGeometry(200, 200, 200);
const material = new MeshNormalMaterial();
const mesh = new Mesh(geometry, material);

new OrbitControls(camera);

scene.add(mesh);
camera.position.z = 1000;

renderer.camera = camera;
renderer.scene = scene;

mesh.rotation.x = (Math.PI*2) * .3;

TWEEN.to(mesh.rotation, 20, {z: Math.PI*2, yoyo: true, repeat: -1})

renderer.start();

document.body.style.margin = 0;
document.body.style.overflow = 'hidden';
document.body.appendChild( renderer.domElement );
