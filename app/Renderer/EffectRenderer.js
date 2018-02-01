import { WebGLRenderer, WebGLRenderTarget, LinearFilter, RGBFormat, OrthographicCamera, Mesh, Scene, PlaneGeometry } from 'three';
import { setRendererSize } from '../stores/RendererStore.js';
import store from '../stores/store.js';

export default class EffectRenderer {

  constructor(options) {
    const { width, height } = this.getSize();
    const RenderTarget = new WebGLRenderTarget(width, height, { minFilter: LinearFilter, magFilter: LinearFilter, format: RGBFormat, stencilBuffer: false });

    // Set up class globals
    this.resolution = window.devicePixelRatio;
    this.animationToken = 0;

    // and the targets
    this.rTarget1 = RenderTarget.clone();
    this.rTarget1.texture.name = 'RT1';
    this.rTarget2 = RenderTarget.clone();
    this.rTarget2.texture.name = 'RT2';
    this.writeBuffer = this.rTarget1;
    this.readBuffer = this.rTarget2;

    // Add a render pass
    this.passes = [];

    // now add a renderer, camera and plane to render the textures to
    this.renderer = new WebGLRenderer(options);
    // console.log('EffectRenderer make renderer', this.renderer.id = 'id-internal-renderer');
    this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.quad = new Mesh(new PlaneGeometry(2,2), null);
    this.scene = new Scene();
    this.scene.add(this.quad);

    // events
    window.addEventListener('resize', this.resizeHandler.bind(this));

    // set up renderer
    this.renderer.setPixelRatio(this.resolution);
    this.renderer.setSize(width / this.resolution, height / this.resolution);

    // populate the store
    this.setStore();

    // and resize
    this.resizeHandler();
  }

  get domElement() {
    return this.renderer.domElement;
  }

  addPass(shader) {
    this.passes.push(shader);
  }

  setStore() {
    store.dispatch(setRendererSize(this.getWindowSize()));
  }

  resizeHandler() {
    const { width, height } = this.getWindowSize();
    const tWidth = width * this.resolution;
    const tHeight = height * this.resolution;
    const rT = this.rTarget1.clone();

    this.active = false;

    this.renderer.setSize(width, height);
    rT.setSize(tWidth, tHeight);

    // // now reset the targets
    this.rTarget1.dispose();
    this.rTarget2.dispose();
    this.rTarget1 = rT;
    this.rTarget2 = rT.clone();
    this.writeBuffer = this.rTarget1;
    this.readBuffer = this.rTarget2;

    // console.log('EffectRenderer reset targets')
    // console.log('EffectRenderer Write Buffer: ' + this.writeBuffer.uuid);
    // console.log('EffectRenderer Read Buffer: ' + this.readBuffer.uuid);

    // update the store and emit
    this.setStore();

    this.active = true;
  }

  getWindowSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    return {
      width,
      height,
      resolution: window.devicePixelRatio
    };
  }

  getSize() {
    const width = window.innerWidth * window.devicePixelRatio;
    const height = window.innerHeight * window.devicePixelRatio;

    return { width, height };
  }

  start() {
    this.active = true;
    this.animationToken = window.requestAnimationFrame(this.animate.bind(this));
  }

  stop() {
    window.cancelAnimationFrame(this.animationToken);
    this.active = false;
  }

  isRenderable() {
    return this.scene !== false && this.camera !== false;
  }

  animate() {
    if (this.active && this.isRenderable()) {
      this.render();
      window.requestAnimationFrame(this.animate.bind(this));
    }
  }

  render() {
    // loop over passes and call the render function
    this.passes.forEach( (pass)=>{
      if(!pass.enabled) return;

      // console.log('EffectRenderer Pass', pass)

      pass.render(this.renderer, this.writeBuffer, this.readBuffer, {
        camera: this.camera,
        scene: this.scene,
        quad: this.quad
      });

      if(pass.needsSwap) {
        // console.log('EffectRenderer: swapping buffers')
        const tmp = this.readBuffer;
        this.readBuffer = this.writeBuffer;
        this.writeBuffer = tmp;
      }
    } );
  }

}

import { UniformsUtils, ShaderMaterial } from 'three'

export class ShaderPass {
  constructor(shader, ID = 'tDiffuse') {
    const { uniforms, vertexShader, fragmentShader } = shader;
    this.textureID = ID;
    this.uniforms = UniformsUtils.clone(uniforms);
    this.material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader
    });
    this.renderToScreen = false;
    this.enabled = true; // process it
    this.needsSwap = true; // swap buffers after render
    this.clear = false; // clear buffer before rendering
  }

  render(renderer, writeBuffer, readBuffer, RendererBits) {

    const { camera, scene, quad } = RendererBits;

    if (this.uniforms[this.textureID]) {
      // console.log('ShaderPass: Set the uniform texture id as ReadBuffer.texture')
      this.uniforms[this.textureID].value = readBuffer.texture
    }

    quad.material = this.material;

    if (this.renderToScreen) {
      // console.log('ShaderPass Render To Screen');
      renderer.render(scene, camera);
    } else {
      // console.log('ShaderPass Render to WriteBuffer', writeBuffer.uuid);
      renderer.render(scene, camera, writeBuffer, this.clear);
    }
  }
}

export const CopyShader = {
  uniforms: {
    'tDiffuse': { type: 't', value: null },
    'opacity': { type: 'f', value: 1 }
  },
  vertexShader: `varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
  fragmentShader: `uniform float opacity;
    uniform sampler2D tDiffuse;
    varying vec2 vUv;
    void main() {
      vec4 texel = texture2D( tDiffuse, vUv );
      gl_FragColor = opacity * texel;
    }`
}

export class RenderPass {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.enabled = true;
    this.clear = true;
    this.needsSwap = false;
  }
  render(renderer, writeBuffer, readBuffer) {
    // console.log('RenderPass into ReadBuffer', readBuffer.uuid);
    this.scene.overrideMaterial = this.overrideMaterial;
    renderer.render(this.scene, this.camera, readBuffer, this.clear);
    this.scene.overrideMaterial = null;
  }
}

export class ClearPass {
  constructor(clearColor = 0x000000, clearAlpha = 0) {
    this.needsSwap = false;
    this.enabled = true;
    this.clear = false;
    this.renderToScreen = false;
    this.clearColor = clearColor;
    this.clearAlpha = clearAlpha;
  }

  render(renderer, writeBuffer, readBuffer) {
    const oldClearColor = renderer.getClearColor().getHex();
    const oldClearAlpha = renderer.getClearAlpha();

    renderer.setClearColor(this.clearColor, this.clearAlpha);

    renderer.setRenderTarget(readBuffer);
    renderer.clear();
    renderer.setClearColor(oldClearColor, oldClearAlpha);
  }
}
