import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Cube.glb';

export default class Cube extends Group {
  constructor() {
    const loader = new GLTFLoader();
    
    super();

    this.name = 'cube';

    loader.load(MODEL, (gltf)=>{

      this.scale.set(1, 1, 1);

      this.add(gltf.scene);

      // Accede a los objetos individuales
      const objeto1 = gltf.scene.getObjectByName('01');
      const objeto2 = gltf.scene.getObjectByName('02');
      const objeto3 = gltf.scene.getObjectByName('03');

      // Modifica la posición en el eje Z
      if (objeto1) {
        objeto1.scale.z = 1;
        objeto1.scale.y = 1;
      };

      if (objeto2) {
        objeto2.scale.z = 1;
        objeto2.scale.y = 1;
      };
      if (objeto3) {
        objeto3.scale.z = 1;
        objeto3.scale.y = 1;
      };
    });
  };
};
