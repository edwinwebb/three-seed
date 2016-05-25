/**
 * App.js
 *
 * The main entry point, appends Three to the DOM
 * and starts a render and animation loop
 *
 */

import './index.html';
import {config} from '../package.json';
import Renderer from './Renderer/Renderer';
import AnimationStore from './stores/AnimationStore';
import {Scene, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh} from 'three';
import THREE from 'three';
import Bunny from './Bunny/Bunny';

const renderer = new Renderer(config.stageWidth, config.stageHeight);
const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
const material = new THREE.MeshNormalMaterial();
const bunny = new Bunny();
const mesh = new Mesh( bunny.geometry, material );
const OrbitControls = require('three-orbit-controls')(THREE)
const controls = new OrbitControls(camera);

scene.add(mesh);
camera.position.z = 1000;

renderer.camera = camera;
renderer.scene = scene;

mesh.rotation.x = (Math.PI*2) * .75;

renderer.start();

document.body.appendChild( renderer.domElement );
