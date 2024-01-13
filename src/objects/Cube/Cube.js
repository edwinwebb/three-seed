import { Group,ExtrudeGeometry, BoxGeometry,  MeshStandardMaterial, Mesh, Vector3, Shape, BufferGeometry, Geometry} from 'three';
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
      //if (objeto1) {
        //objeto1.scale.z = 0.1;
        //objeto1.scale.y = 1;
        /*
        const squareShape = new Shape();
        squareShape.moveTo(0, 0);
        squareShape.lineTo(0, 2);
        squareShape.lineTo(1, 1);
        squareShape.lineTo(1, 0); //se puede hacer pero tocaria 
        squareShape.lineTo(0, 0);
        
        const geometria = objeto1.geometry;
        // Define la configuración de extrusión
        const extrudeSettings = {
        //steps: 5, // Número de pasos para la extrusión
        depth: 10, // Profundidad de la extrusión
        bevelEnabled: false // Desactiva el biselado para mantener una forma simple
        };

        // Crea la geometría extruida a partir de la forma
        const extrudeGeometry = new ExtrudeGeometry(geometria, extrudeSettings);
        const material = new MeshStandardMaterial({color: 0x00ff00});
        // Crea el objeto Mesh utilizando la geometría extruida y el material
        const extrudedCube = new Mesh(extrudeGeometry, material);
        extrudedCube.castShadow = true;

        // Establece la posición del cubo
        extrudedCube.position.set(0, 0, 0);
        
        this.add(extrudedCube);*/
     if (objeto1){
        objeto1.scale.z=1;
      };

      if (objeto2) {
        objeto2.scale.z = 1;
        objeto2.scale.y = 3;
      };
      if (objeto3) {
        objeto3.scale.z = 1;
        objeto3.scale.y = 1;
      };
    });
  };
};


