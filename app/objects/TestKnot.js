import { Mesh, TorusKnotGeometry, MeshStandardMaterial } from 'three';
import TWEEN from 'gsap';

export default class TestKnot extends Mesh {
  constructor() {
    const geometry = new TorusKnotGeometry( 10, 3, 100, 16 );
    const material = new MeshStandardMaterial({color: 0xFF0000});

    super(geometry, material);

    geometry.dispose();
    material.dispose();

    this.rotation.x = (Math.PI*2) * 0.3;

    TWEEN.to(this.rotation, 20, {z: Math.PI*2, yoyo: true, repeat: -1});
  }
}
