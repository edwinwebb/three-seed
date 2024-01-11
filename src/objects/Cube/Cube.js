import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Cube.glb';

export default class Cube extends Group {
  constructor() {
    const loader = new GLTFLoader();
    
    super();

    this.name = 'cube';

    loader.load(MODEL, (gltf)=>{
      this.add(gltf.scene);
    });
  }
}
