import { Group, Mesh, MeshNormalMaterial } from 'three';
import BUNNYMODEL from './bunny.model.json';
import { loadModel } from '../../Loaders/loader';

export default class extends Group {
  constructor() {
    super();

    loadModel(BUNNYMODEL).then( (geometry)=>{
      const material = new MeshNormalMaterial();
      const mesh = new Mesh(geometry, material);
      this.add(mesh);
      geometry.dispose();
      material.dispose();
    } );
  }
}
