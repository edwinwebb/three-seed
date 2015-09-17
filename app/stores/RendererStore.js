import EventEmitter from 'events';
import { RESIZE } from '../constants/AppConstants';

class RendererStore extends EventEmitter {

  constructor(...args) {
    super(...args);

    this.data = {
      width: 0,
      height: 0,
      stageWidth: 0,
      stageHeight: 0,
      stageCenter: {x: 0,y: 0},
      resolution: 1
    };
  }

  get(key) {
    return this.data[key];
  }

  set(key, value) {
    return this.data[key] = value;
  }

  emitChange() {
    this.emit(RESIZE, this.data);
  }

  addChangeListener(callback) {
    this.on(RESIZE, callback);
  }
}

export default new RendererStore();
