import EventEmitter from 'events';
import { ANIMATE } from '../constants/AppConstants';

class AnimationStore extends EventEmitter {

  constructor(...args) {
    super(...args);

    this.data = {
      tick: 0,
      startTime : 0,
      currentTime : 0
    };

    this.data.startTime = window.performance.now();
    this.data.currentTime = window.performance.now();
  }

  get(key) {
    return this.data[key];
  }

  set(key, value) {
    return this.data[key] = value;
  }

  emitChange() {
    this.data.tick++;
    this.data.currentTime = window.performance.now();
    this.emit(ANIMATE, this.data);
  }

  addChangeListener(callback) {
    this.on(ANIMATE, callback, this.data);
  }
}

export default new AnimationStore();
