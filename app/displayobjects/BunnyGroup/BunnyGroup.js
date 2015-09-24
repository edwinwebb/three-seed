import {Container} from 'pixi.js';
import Bunny from '../Bunny/Bunny.js';

/**
 * A group of spinning bunnies
 *
 * @exports BunnyGroup
 * @extends Container
 */
export default class BunnyGroup extends Container {

  constructor() {
    const spreadX = 800;
    const spreadY = 100;
    const count = 500;

    super();

    for(let i = 0; i < count; i++) {
      let bunny = new Bunny();

      bunny.position.x = (Math.random() * spreadX) - (spreadX / 2);
      bunny.position.y = -(Math.random() * spreadY * .2);

      this.addChild(bunny);
    }
  }
}
