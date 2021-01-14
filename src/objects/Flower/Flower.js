import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Flower.gltf';
import './Flower.bin';

export default class Flower extends Group {
  constructor() {
    const loader = new GLTFLoader();
    
    super();

    this.name = 'flower';

    loader.load(MODEL, (glft)=>{
      this.add(glft.scene);
    });
  }
}
