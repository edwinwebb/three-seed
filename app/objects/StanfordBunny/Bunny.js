import { Group, Mesh, MeshStandardMaterial, PlaneGeometry } from 'three';
import BUNNYMODEL from './bunny.model.json';
import BUNNYSCENE from './bunny.scene.json';
import { loadModel, loadScene, loadTextureSet, GetAsset } from '../../Loaders/loader';
import BUMP from './textures/brick_bump.jpg';
import DIFFUSE from './textures/brick_diffuse.jpg';
import ROUGH from './textures/brick_roughness.jpg';

export default class extends Group {
  constructor() {
    super();

    loadModel(BUNNYMODEL).then( (geometry)=>{
      geometry.computeVertexNormals();
      const material = new MeshStandardMaterial();
      const mesh = new Mesh(geometry, material);
      this.add(mesh);
      mesh.position.x = 1.2 / -2;
      geometry.dispose();
      material.dispose();
    } );

    loadScene(BUNNYSCENE).then( (mesh)=>{
      this.add(mesh);

      mesh.position.x = 1.2 / 2;
      mesh.position.y = -0.3
    } );


    loadTextureSet([BUMP, DIFFUSE, ROUGH]).then( (textures) => {
      const geometry = new PlaneGeometry(50,50);
      const material = new MeshStandardMaterial({
        color: 0x888888,
        bumpMap: GetAsset(BUMP, textures),
        map: GetAsset(DIFFUSE, textures),
        roughnessMap: GetAsset(ROUGH, textures),
        roughness: 10,
        metalness: 0
      })
      material.map.anisotropy = 4;
			material.bumpMap.anisotropy = 4;
      const mesh = new Mesh(geometry, material);

      this.add(mesh);
      mesh.rotation.x = -Math.PI / 2;
      mesh.scale.set(0.5, 0.5, 0.5);

      geometry.dispose();
      material.dispose();

    } )



  }
}
