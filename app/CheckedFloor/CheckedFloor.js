import THREE from 'three';
import img from './checker.png';

export default class checkedFloor {

  constructor(renderer) {
    const texture = THREE.ImageUtils.loadTexture(img);

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat = new THREE.Vector2(50, 50);
    texture.anisotropy = renderer.getMaxAnisotropy();

    this.texture = texture;
  }

  get mesh() {
    const floorMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0xffffff,
      shininess: 20,
      shading: THREE.FlatShading,
      map: this.texture
    });

    const floorGeometry = new THREE.PlaneGeometry(1000, 1000);

    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floorMesh.rotation.x = -Math.PI / 2;

    console.log(floorMaterial)

    return floorMesh;
  }

}
