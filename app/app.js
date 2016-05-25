/**
 * App.js
 *
 * The main entry point, appends Three to the DOM
 * and starts a render and animation loop
 *
 */

import THREE from 'three';
import {config} from '../package.json';
import Renderer from './Renderer/Renderer';
import AnimationStore from './stores/AnimationStore';
import RendererStore from './stores/RendererStore';
import {Scene, PerspectiveCamera} from 'three';
import Bunny from './Bunny/Bunny';
import CheckedFloor from './CheckedFloor/CheckedFloor';

const OrbitControls = require('three-orbit-controls')(THREE);
const StereoEffect = require('three-stereo-effect')(THREE);

const renderer = new Renderer(config.stageWidth, config.stageHeight);
const scene = new Scene();
const camera = new PerspectiveCamera(90, 1,  0.001, 700);
const bunny = new Bunny();
const checkedFloor = new CheckedFloor(renderer);
const controls = new OrbitControls(camera);
//const stereoEffect = new StereoEffect(renderer);
const light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);

camera.position.set(0, 10, 0);

scene.add(light);
//scene.add(bunny.mesh);
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

//stereoEffect.eyeSeparation = 1;
//stereoEffect.setSize(config.stageWidth, config.stageHeight);

bunny.mesh.position.y = 240;
bunny.mesh.position.z = -500;

renderer.camera = camera;
renderer.scene = scene;
renderer.start();

AnimationStore.addChangeListener(()=>{
  //stereoEffect.render(scene, camera);
});

document.body.style.margin = 0;
document.body.appendChild( renderer.domElement );
