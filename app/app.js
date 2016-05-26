/**
 * App.js
 *
 * The main entry point, appends Three to the DOM
 * and starts a render and animation loop
 *
 */

import THREE from 'three';
import Renderer from './Renderer/Renderer';
import AnimationStore from './stores/AnimationStore';
import RendererStore from './stores/RendererStore';
import {Scene, PerspectiveCamera} from 'three';
import Bunny from './Bunny/Bunny';
import CheckedFloor from './CheckedFloor/CheckedFloor';
import DeviceControls from './controls/DeviceOrientationControls.js';

const OrbitControls = require('three-orbit-controls')(THREE);
const StereoEffect = require('three-stereo-effect')(THREE);

const renderer = new Renderer(window.innerWidth, window.innerHeight);
const scene = new Scene();
const camera = new PerspectiveCamera(90, window.innerWidth / window.innerHeight,  0.001, 700);
const bunny = new Bunny();
const checkedFloor = new CheckedFloor(renderer);
const controls = new OrbitControls(camera);
const stereoEffect = new StereoEffect(renderer);
const light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
const bunnyMesh = bunny.mesh;
const deviceControls = new DeviceControls(camera);

camera.position.set(0, 10, 0);

scene.add(light);
scene.add(bunnyMesh);
scene.add(checkedFloor.mesh);
scene.add(camera);

controls.constraint.rotateUp(Math.PI / 4);
controls.target.set(
  camera.position.x + 0.1,
  camera.position.y,
  camera.position.z
);
controls.enableZoom = false;
controls.enablePan = true;

stereoEffect.eyeSeparation = 1;
stereoEffect.setSize(window.innerWidth, window.innerHeight);

bunnyMesh.position.y = 240;
bunnyMesh.position.z = -600;

renderer.camera = camera;
renderer.scene = scene;
renderer.start();

AnimationStore.addChangeListener(()=>{
  stereoEffect.render(scene, camera);
});

RendererStore.addChangeListener(()=>{
  stereoEffect.setSize(window.innerWidth, window.innerHeight);
});

document.body.style.margin = 0;
renderer.domElement.addEventListener('click',()=>{
  document.body.webkitRequestFullScreen();
});
document.body.appendChild( renderer.domElement );
