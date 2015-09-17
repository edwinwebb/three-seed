import ScaledObjectGroup from '../ScaledObjectGroup/ScaledObjectGroup.js';
import BunnyGroup from '../BunnyGroup/BunnyGroup.js';
import Bunny from '../Bunny/Bunny.js';
import Background from '../Background/Background.js';
import RendererStore from '../../stores/RendererStore.js';

export default class App extends ScaledObjectGroup {

  constructor(...args) {
    var bg = new Background();

    super(...args);

    this.addChild(bg);

    this.addBunnies();

  }

  addBunnies() {
    const cx = RendererStore.get('stageCenter').x;
    const cy = RendererStore.get('stageCenter').y;

    let group1 = new BunnyGroup();
    let b1 = new Bunny();

    b1.position.x = cx;
    b1.position.y = cy;

    group1.position.x = cx;
    group1.position.y = cy + (RendererStore.get('stageHeight')*.25);

    this.addChild(b1);
    this.addChild(group1);
  }

}
