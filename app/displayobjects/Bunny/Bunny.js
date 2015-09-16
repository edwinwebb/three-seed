import TWEEN from 'tween.js';
import PIXI from 'pixi.js';
import BUNNY from'./bunny.png';

export default class Bunny extends PIXI.Sprite {

  constructor() {
    var texture = PIXI.Texture.fromImage(BUNNY);

    super(texture);

    this.tween = new TWEEN.Tween(this);

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
