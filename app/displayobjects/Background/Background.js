import PIXI from 'pixi.js';
import TEXTURE from './diagnostic.png';

/**
 * Loads the adds the diagnostic image
 *
 * @exports Background
 * @extends Container
 */
export default class Background extends PIXI.Container {

  constructor() {
    super();

    var bg = PIXI.Sprite.fromImage(TEXTURE);

    this.addChild(bg);
  }

}
