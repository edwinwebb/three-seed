import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Land.glb';

export default class Land extends Group {
  constructor() {
    const loader = new GLTFLoader();
    
    super();

    this.name = 'land';

    loader.load(MODEL, (gltf)=>{
      this.add(gltf.scene);
    });
  }
}
