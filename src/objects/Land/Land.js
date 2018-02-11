import { Group, ObjectLoader  } from 'three';
import MODEL from './land.json';

export default class Flower extends Group {
  constructor() {
    const loader = new ObjectLoader();
    
    super();

    this.name = 'land';

    loader.load(MODEL, (mesh)=>{
      this.add(mesh)
    });
  }
}
