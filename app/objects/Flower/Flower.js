/**
 * @exports Flower
 */

import { Group  } from 'three';
import MODEL from './tree.json';
import { loadScene } from '../../Loaders/loader';

export default class Flower extends Group {
  constructor() {
    super();

    this.loadingFunction = (p) => {
      console.log('loading flower', p)
    }
    this.name = 'flower';
    this.load();
  }

  async load() {
    const flower = await loadScene(MODEL, this.loadingFunction);
    this.flower = flower;

    window.flower = flower;

    this.add(flower);
  }
}
