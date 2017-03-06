import { Group, HemisphereLight, PointLight } from 'three';
import TWEEN from 'gsap';

export default class BasicLights extends Group {
  constructor(...args) {
    super(...args);

    const hemisphere = new HemisphereLight(0xFFFFFF, 0x333333, 1);
    const point = new PointLight(0xFFFFFF, 1);

    point.position.set(0, 1, 1);

    TWEEN.fromTo(point.position, 1, {x: -2}, {x: 2, yoyo: true, repeat: -1});

    this.add(point, hemisphere);
  }
}
