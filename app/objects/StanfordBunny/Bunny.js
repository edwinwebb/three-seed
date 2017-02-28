import { Group, Mesh, MeshNormalMaterial } from 'three';
import BUNNY from './bunny.scene.json';
import { loadScene } from '../../Loaders/loader';

export default class extends Group {
  constructor() {
    super();

    loadScene(BUNNY).then( (mesh)=>{
      // const material = new MeshNormalMaterial();
      // const mesh = new Mesh(geometry, material);
      this.add(mesh);
      console.log(mesh);
      // geometry.dispose();
      // material.dispose();
    } );
  }
}
