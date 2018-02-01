import { Group  } from 'three';
import LANDMOD from './land.json';
import { loadScene } from '../../Loaders/loader';
import store from '../../stores/store.js';

export default class extends Group {
  constructor() {
    super();

    this.loadingFunction = (p) => {
      console.log('loading', p)
    }
    this.name = 'land';
    this.load();

    store.subscribe(() => {
      const { test } = store.getState().App;
      this.landScene.scale.set(4 * test, 4* test, 4* test);
    });
  }

  async load() {
    const landScene = await loadScene(LANDMOD, this.loadingFunction);
    landScene.rotation.z = Math.PI;
    landScene.scale.set(4,4,4)
    window.land = landScene;
    this.landScene = landScene;

    this.add(landScene);
  }
}