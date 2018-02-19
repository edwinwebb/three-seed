import { Group, ObjectLoader  } from 'three';
import MODEL from './flower.json';

export default class Flower extends Group {
  constructor() {
    const loader = new ObjectLoader();
    
    super();

    this.name = 'flower';

    loader.load(MODEL, (mesh)=>{
      this.add(mesh);
    });
  }
}
