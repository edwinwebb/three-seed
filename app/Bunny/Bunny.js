import THREE from 'three';
import bunnyJSON from './stanford-bunny.json';

const JSONLoader = new THREE.JSONLoader();

export default class Renderer  {

  constructor() {
    const bunny = JSONLoader.parse(bunnyJSON.geometries[0].data);
    this.bunnyGeometry = bunny.geometry;
  }

  get geometry() {
    return this.bunnyGeometry;
  }

}
