import { Group, HemisphereLight } from 'three';

export default class BasicLights extends Group {
  constructor(...args) {
    super(...args);

    const hemisphere = new HemisphereLight(0xFFFFFF, 0x333333, 1);

    this.add(hemisphere);

  }
}
