import { Group, SpotLight, PointLight, AmbientLight } from 'three';
import TWEEN, { Linear } from 'gsap';
export default class BasicLights extends Group {
  constructor(...args) {
    super(...args);

    const point = new PointLight(0xFFFFFF, 1, 10, 1);
    const dir = new SpotLight(0xFFFFFF, 1, 100, 1, 1, 1);
    const ambi = new AmbientLight( 0x404040 , 1); // soft white light

    dir.position.set(5, 1, 2);
    dir.target.position.set(0,0,0);

    //dir.castShadow = true;

    dir.shadow.mapSize.width = 512 * 2;
    dir.shadow.mapSize.height = 512 * 2;

    dir.shadow.camera.near = 1;
    dir.shadow.camera.far = 10;
    dir.shadow.camera.fov = 40;

    point.position.set(0, 1, 5);

    TWEEN.fromTo(point.position, 4, {x: -2}, {x: 2, yoyo: true, repeat: -1, ease: Linear.easeNone});

    this.add(dir);
    this.add(ambi)
  }
}
