import { Group  } from 'three';
import LANDMOD from './land.json';
import { loadScene } from '../../Loaders/loader';
import store from '../../stores/store.js';

export default class extends Group {
  constructor() {
    super();

    this.loadingFunction = (p) => {
      console.log('loading island', p)
    }
    this.name = 'land';
    this.load();

    store.subscribe(() => {
      const { islandScale } = store.getState().App;
      this.landScene.scale.set(4 * islandScale, 4 * islandScale, 4 * islandScale);
    });
  }

  async load() {
    const landScene = await loadScene(LANDMOD, this.loadingFunction);
    landScene.rotation.z = Math.PI;
    landScene.scale.set(4,4,4);
    this.landScene = landScene;

    this.add(landScene);
  }
}