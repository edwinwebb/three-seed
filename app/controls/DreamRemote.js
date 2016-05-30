/**
 * Dream Remote
 */

import RemoteStore from '../stores/RemoteStore.js';

const DefaultURL = `ws://${window.location.hostname}:8081/`;

export default class DreamRemote {

  constructor() {
    this.connected = false;

    this.onMessage = this.onMessage.bind(this);

    this.socket = new WebSocket(DefaultURL);
    this.socket.addEventListener('open',(e)=>{this.connected = true;});
    this.socket.addEventListener('close',(e)=>{this.connected = false;});
    this.socket.addEventListener('error', (e)=>{throw new Error('DreamRemote Socket Error', e)});
    this.socket.addEventListener('message', this.onMessage);
  }

  onMessage(e) {
    const data = JSON.parse(e.data);

    RemoteStore.dispatchRemoteEvent(data);
  }
}
