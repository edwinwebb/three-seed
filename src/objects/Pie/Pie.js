import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Pie.glb';
import { Color } from '../../three.module';

export default class Pie extends Group {
  constructor() {
    const loader = new GLTFLoader();
    
    super();

    this.name = 'pie';

    loader.load(MODEL, (gltf)=>{
      this.add(gltf.scene);
      this.scale.set(10, 10, 10);
      this.position.set(0,0,0);
      

    const objeto1 = gltf.scene.getObjectByName('01');

    if (objeto1){
      var valorEnY = 40;
      var total = valorEnY * 2;
      objeto1.scale.y = total;
    };

    
    });
  }
}
