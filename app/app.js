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
import DeviceControls from './controls/DeviceOrientationControls.js';
import Remote from './controls/DreamRemote.js';
const OrbitControls = require('three-orbit-controls')(THREE);
const StereoEffect = require('three-stereo-effect')(THREE);

const renderer = new Renderer(window.innerWidth, window.innerHeight);
const scene = new Scene();
const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight,  0.001, 20000);
const controls = new OrbitControls(camera);
const stereoEffect = new StereoEffect(renderer);
const light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
const deviceControls = new DeviceControls(camera);
const remote = new Remote();

camera.position.set(0, 100, 0);

scene.add(light);
scene.add(camera);
scene.add(new THREE.GridHelper( 1000, 100, 0xffffff, 0xffffff ));

for (let y = 40; y < 600; y+=100) {
  for (let i = 0; i < 40; i++) {
    let r = i % 2 ? 500 : 600;
    let geometry = new THREE.BoxBufferGeometry( 40, 40, 40 );
  	let material = new THREE.MeshNormalMaterial();
    let mesh = new THREE.Mesh( geometry, material );

    let x = r * Math.cos(2 * Math.PI * i / 40);
    let z = r * Math.sin(2 * Math.PI * i / 40);

    mesh.position.set(x+y/2,y,z);
    mesh.rotation.set(0,(-2 * Math.PI ) * (i / 40),0)

    scene.add(mesh);
  }
}

controls.constraint.rotateUp(Math.PI / 4);
controls.target.set(
  camera.position.x + 0.1,
  camera.position.y + 100,
  camera.position.z
);
controls.enableZoom = false;
controls.enablePan = true;

stereoEffect.eyeSeparation = 1;
stereoEffect.setSize(window.innerWidth, window.innerHeight);

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
