import { Group, Mesh, MeshStandardMaterial, PlaneGeometry, RepeatWrapping } from 'three';
import BUNNYMODEL from './bunny.model.json';
import BUNNYSCENE from './bunny.scene.json';
import { loadModel, loadScene, loadTextureSet, GetAsset } from '../../Loaders/loader';
import BUMP from './textures/brick_bump.jpg';
import DIFFUSE from './textures/brick_diffuse.jpg';
import ROUGH from './textures/brick_roughness.jpg';

export default class extends Group {
  constructor() {
    super();

    this.load();
  }

  async load() {

    const geometry = await loadModel(BUNNYMODEL);
    const bunnyScene = await loadScene(BUNNYSCENE);
    const material = new MeshStandardMaterial();
    const mesh = new Mesh(geometry, material);

    mesh.position.x = 1.2 / -2;
    geometry.dispose();
    material.dispose();

    bunnyScene.position.set(1.2 / 2, -0.3, 0);

    this.add(mesh, bunnyScene);

    loadTextureSet([BUMP, DIFFUSE, ROUGH]).then( (textures) => {
      const getTexture = (url) => {
        const texture = GetAsset(url, textures);
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.repeat.set(2,2);
        return texture;
      }
      const geometry = new PlaneGeometry(25,25);
      const material = new MeshStandardMaterial({
        color: 0x888888,
        bumpMap: getTexture(BUMP),
        map: getTexture(DIFFUSE),
        roughnessMap: getTexture(ROUGH),
        roughness: 10,
        metalness: 0
      })
      const mesh = new Mesh(geometry, material);

      this.add(mesh);
      mesh.rotation.x = -Math.PI / 2;

      geometry.dispose();
      material.dispose();

    } );
  }
}
