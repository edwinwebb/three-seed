import { Mesh, BoxGeometry, MeshNormalMaterial } from 'three';
import TWEEN from 'gsap';

export default class TestCube extends Mesh {
  constructor() {
    const geometry = new BoxGeometry(0.75, 0.75, 0.75);
    const material = new MeshNormalMaterial();

    super(geometry, material);

    geometry.dispose();
    material.dispose();

    this.rotation.x = (Math.PI*2) * 0.3;

    TWEEN.to(this.rotation, 20, {z: Math.PI*2, yoyo: true, repeat: -1});
  }
}
