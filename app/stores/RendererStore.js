'use strict';

import EventEmitter from 'events';
import { RESIZE } from '../constants/AppConstants';

class RendererStore extends EventEmitter {

  constructor(...args) {
    super(...args);
    this.init();
  }

  init() {
    this.data = new Map();
  }

  get(key) {
    return this.data.get(key);
  }

  set(key, value) {
    var val = this.data.set(key, value);
    return val;
  }

  emitChange() {
    this.emit(RESIZE, this.data);
  }

  addChangeListener(callback) {
    this.on(RESIZE, callback);
  }
}

export default new RendererStore();
