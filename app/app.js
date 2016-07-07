/**
 * App.js
 *
 * The main entry point, appends Three to the DOM
 * and starts a render and animation loop
 *
 */

import {config} from '../package.json';
import Renderer from './Renderer/Renderer';
import AnimationStore from './stores/AnimationStore';
import {Scene, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh} from 'three';
import THREE from 'three';
import TWEEN from 'gsap';

const renderer = new Renderer(config.stageWidth, config.stageHeight);
const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
const OrbitControls = require('three-orbit-controls')(THREE)
const controls = new OrbitControls(camera);

const geometry = new THREE.BoxBufferGeometry(200, 200, 200);
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
camera.position.z = 1000;

renderer.camera = camera;
renderer.scene = scene;

mesh.rotation.x = (Math.PI*2) * .3;

TWEEN.to(mesh.rotation, 1, {z: Math.PI*2, yoyo: true, repeat: -1})

renderer.start();

document.body.style.margin = 0;
document.body.style.overflow = 'hidden';
document.body.appendChild( renderer.domElement );
