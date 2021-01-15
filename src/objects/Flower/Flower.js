import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Flower.glb';

export default class Flower extends Group {
  constructor() {
    const loader = new GLTFLoader();
    
    super();

    this.name = 'flower';

    loader.load(MODEL, (gltf)=>{
      this.add(gltf.scene);
    });
  }
}
