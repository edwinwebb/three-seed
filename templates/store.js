import EventEmitter from 'events';
import { * } from '../constants/AppConstants';

class {%=o.exports%} extends EventEmitter {

  constructor(...args) {
    super(...args);

    this.data = {
      zero: 0
    };
  }

  get(key) {
    return this.data[key];
  }

  set(key, value) {
    return this.data[key] = value;
  }

  emitChange() {
    this.emit("NONE", this.data);
  }

  addChangeListener(callback) {
    this.on("NONE", callback);
  }
}

export default new {%=o.exports%}();
