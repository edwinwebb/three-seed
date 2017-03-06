import { Group, Mesh, MeshNormalMaterial } from 'three';
import BUNNYMODEL from './bunny.model.json';
import BUNNYSCENE from './bunny.scene.json';
import { loadModel, loadScene } from '../../Loaders/loader';

export default class extends Group {
  constructor() {
    super();

    loadModel(BUNNYMODEL).then( (geometry)=>{
      const material = new MeshNormalMaterial();
      const mesh = new Mesh(geometry, material);
      this.add(mesh);
      mesh.position.x = 1.2 / -2;
      geometry.dispose();
      material.dispose();
    } );

    loadScene(BUNNYSCENE).then( (mesh)=>{
      this.add(mesh);
      mesh.position.x = 1.2 / 2;
      mesh.position.y = -0.3
    } );
  }
}
