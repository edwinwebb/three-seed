
import THREE from 'three';

const zee = new THREE.Vector3( 0, 0, 1 );
const euler = new THREE.Euler();
const q0 = new THREE.Quaternion();
const q1 = new THREE.Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) ); // - PI/2 around the x-axis

export default class DeviceOrientationControls {
  constructor(camera) {
    this.camera = camera;
    this.camera.rotation.reorder("YXZ");
    this.update = this.update.bind(this);
    this.onScreenOrientationChangeEvent = this.onScreenOrientationChangeEvent.bind(this);
    this.alphaOffsetAngle = 0; // orientation flag
    window.addEventListener( 'orientationchange', this.onScreenOrientationChangeEvent, false );
    window.addEventListener('deviceorientation', this.update, false );
    this.onScreenOrientationChangeEvent();
  }

  onScreenOrientationChangeEvent() {
    this.alphaOffsetAngle = window.orientation || 0;
  }

  setObjectQuaternion( quaternion, alpha, beta, gamma, orient ) {

    euler.set( beta, alpha, - gamma, 'YXZ' ); // 'ZXY' for the device, but 'YXZ' for us
    quaternion.setFromEuler( euler ); // orient the device
    quaternion.multiply( q1 ); // camera looks out the back of the device, not the top
    quaternion.multiply( q0.setFromAxisAngle( zee, - orient ) ); // adjust for screen orientation

  }

  update(event) {
    const alpha = event.alpha ? THREE.Math.degToRad(event.alpha) + this.alphaOffsetAngle : 0; // Z
    const beta = event.beta ? THREE.Math.degToRad(event.beta) : 0; // X'
    const gamma = event.gamma ? THREE.Math.degToRad(event.gamma) : 0; // Y''
    const orient = window.orientation ? THREE.Math.degToRad(this.alphaOffsetAngle || 0 ) : 0; // O

    if(!event.alpha) return false;

    this.setObjectQuaternion( this.camera.quaternion, alpha, beta, gamma, orient );
    this.alpha = alpha;
  }

  off() {
    window.removeEventListener( 'orientationchange', this.onScreenOrientationChangeEvent, false );
    window.removeEventListener('deviceorientation', this.update, false );
  }

}
