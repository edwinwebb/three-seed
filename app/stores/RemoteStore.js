import EventEmitter from 'events';

class RemoteStore extends EventEmitter {

  constructor(...args) {
    super(...args);
  }

  dispatchRemoteEvent(e) {
    this.emit(e.type, e);
  }
}

export default new RemoteStore();
