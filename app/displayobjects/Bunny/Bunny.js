import { Tween } from 'tween.js';
import PIXI from 'pixi.js';
import BUNNY from'./bunny.png';

/**
 * A bunny which spins on it's feet when moused over
 *
 * @exports Bunny
 * @extends Sprite
 */
export default class Bunny extends PIXI.Sprite {

  constructor() {
    const texture = PIXI.Texture.fromImage(BUNNY);

    super(texture);

    this.tween = new Tween(this);

    this.anchor.x = .5;
    this.anchor.y = 1;

    this.pivot.x = .5;
    this.pivot.y = .5;

    this.interactive = true;
  }

  startSpin() {
    this.tween.to({rotation: Math.PI*2}, 1000);
    this.tween.start();
    this.tween.onComplete(function(){this.rotation=0});
  }

  mouseover() {
    this.startSpin();
  }

}
