import { Group,PlaneGeometry,MeshNormalMaterial, Mesh } from 'three';
//import LANDMAT from './material.mtl';
import LANDMOD from './land.json';
import { loadScene } from '../../Loaders/loader';

export default class extends Group {
  constructor() {
    super();

    this.loadingFunction = (p) => {
      console.log('loading', p)
    }
    this.name = 'land';
    this.load();
  }

  async load() {
    console.log('Loading land scene');
    const landScene = await loadScene(LANDMOD, this.loadingFunction);
    console.log('Done loading')
    // const material = new MeshStandardMaterial();
    // const bunny = new Mesh(geometry, material);
    // const getTexture = (url) => {
    //   const texture = GetAsset(url, brickTextures);
    //   texture.wrapS = RepeatWrapping;
    //   texture.wrapT = RepeatWrapping;
    //   texture.repeat.set(2,2);
    //   return texture;
    // };
    // const planeGeo = new PlaneGeometry(25,25);
    // const planeMaterial = new MeshNormalMaterial({
    //   color: 0x888888
    // });
    // const plane = new Mesh(planeGeo, planeMaterial);

    // bunny.castShadow = true;
    // plane.receiveShadow = true;
    // bunny.position.x = 1.2 / -2;
    // plane.rotation.x = -Math.PI / 2;
    window.landScene = landScene;
    // bunnyScene.position.set(1.2 / 2, -0.3, 0);

    //landScene.scale.set(0.05, 0.05, 0.05)
    //landScene.rotation.x = Math.PI * -0.5;

    this.add(landScene);
  }
}