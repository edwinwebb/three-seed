import { Group } from 'three.js';
import Land from './objects/Land/Land.js';
import Flower from './objects/Flower/Flower.js';
import BasicLights from './objects/BasicLights';

export default class SeedScene extends Group {
  constructor() {
    super();

    const land = new Land();
    const flower = new Flower();
    const lights = new BasicLights();

    this.addChild(land, flower, lights);
  }
}