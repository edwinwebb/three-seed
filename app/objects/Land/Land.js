import { Group  } from 'three';
import LANDMOD from './land.json';
import { loadScene } from '../../Loaders/loader';

export default class extends Group {
  constructor() {
    super();

    this.loadingFunction = (p) => {
      console.log('loading', p)
    }
    this.name = 'land';
    this.load();
  }

  async load() {
    console.log('Loading land scene');
    const landScene = await loadScene(LANDMOD, this.loadingFunction);
    console.log('Done loading')

    this.add(landScene);
  }
}