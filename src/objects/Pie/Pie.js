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
    

      for (let i = 1; i <= 5; i++) {
        let asignacion = i.toString().padStart(2, '0');
        let objeto_existente = bpy.data.objects[asignacion];
        
        if (objeto_existente) {
            objeto_existente.scale.z = valor_z[i - 1];
        }
      };
    
      const objeto1 = gltf.scene.getObjectByName('01');
      const objeto5 = gltf.scene.getObjectByName('05');

      if (objeto1){
        var valorEnY = 50;
        var total = valorEnY * 2;
        objeto1.scale.y = total;
      };

      if (objeto5){
        objeto5.scale.y= 30*2;
      }

    });
  }
}
