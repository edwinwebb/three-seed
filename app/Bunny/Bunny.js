import THREE from 'three';
import bunnyJSON from './stanford-bunny.json';

const JSONLoader = new THREE.JSONLoader();

export default class Bunny {

  constructor() {
    const bunny = JSONLoader.parse(bunnyJSON.geometries[0].data);
    this.bunnyGeometry = bunny.geometry;
  }

  get geometry() {
    return this.bunnyGeometry;
  }

  get mesh() {
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(this.bunnyGeometry, material );

    mesh.rotation.x = (Math.PI*2) * .75;

    return mesh;
  }

}
