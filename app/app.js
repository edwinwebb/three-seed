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
import RendererStore from './stores/RendererStore';
import {Scene, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh} from 'three';
import THREE from 'three';
import Bunny from './Bunny/Bunny';
import CheckImg from './checker.png';

const OrbitControls = require('three-orbit-controls')(THREE);
const StereoEffect = require('three-stereo-effect')(THREE);


const renderer = new Renderer(config.stageWidth, config.stageHeight);
const scene = new Scene();
const camera = new PerspectiveCamera(90, 1,  0.001, 700);
const material = new THREE.MeshNormalMaterial();
const bunny = new Bunny();
const mesh = new Mesh( bunny.geometry, material );
const controls = new OrbitControls(camera);
//const stereoEffect = new StereoEffect(renderer);
const light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
let texture = THREE.ImageUtils.loadTexture(CheckImg);
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat = new THREE.Vector2(50, 50);
texture.anisotropy = renderer.getMaxAnisotropy();

let floorMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  specular: 0xffffff,
  shininess: 20,
  shading: THREE.FlatShading,
  map: texture
});
let floorGeometry = new THREE.PlaneGeometry(1000, 1000);

let floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
floorMesh.rotation.x = -Math.PI / 2;
scene.add(floorMesh);

mesh.position.y = 240;



scene.add(light);
scene.add(mesh);
camera.position.set(0, 10, 0);
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

renderer.camera = camera;
renderer.scene = scene;

mesh.rotation.x = (Math.PI*2) * .75;
mesh.position.z = -500;

renderer.start();

AnimationStore.addChangeListener(()=>{
  //stereoEffect.render(scene, camera);
});

document.body.style.margin = 0;
document.body.appendChild( renderer.domElement );
