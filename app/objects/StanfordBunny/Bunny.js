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

    this.loadingFunction = (p) => {
      console.log('loading', p)
    }
    this.name = 'bunny';
    this.load();
  }

  async load() {
    console.log('Loading bunny scene');
    const bunnyScene = await loadScene(BUNNYSCENE, this.loadingFunction);
    console.log('Loading bunny geo');
    const geometry = await loadModel(BUNNYMODEL, this.loadingFunction);
    console.log('Loading brick textures');
    const brickTextures = await loadTextureSet([BUMP, DIFFUSE, ROUGH], this.loadingFunction);
    console.log('Done loading')
    const material = new MeshStandardMaterial();
    const bunny = new Mesh(geometry, material);
    const getTexture = (url) => {
      const texture = GetAsset(url, brickTextures);
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(2,2);
      return texture;
    };
    const planeGeo = new PlaneGeometry(25,25);
    const planeMaterial = new MeshStandardMaterial({
      color: 0x888888,
      bumpMap: getTexture(BUMP),
      bumpScale: 0.2,
      map: getTexture(DIFFUSE),
      roughnessMap: getTexture(ROUGH),
      roughness: 10,
      metalness: 0
    });
    const plane = new Mesh(planeGeo, planeMaterial);

    bunny.castShadow = true;
    plane.receiveShadow = true;
    bunny.position.x = 1.2 / -2;
    plane.rotation.x = -Math.PI / 2;

    bunnyScene.position.set(1.2 / 2, -0.3, 0);

    this.add(bunny, bunnyScene, plane);
  }
}
