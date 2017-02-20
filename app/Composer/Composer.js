import EffectComposer from 'three-effectcomposer-es6';
import { WebGLRenderTarget, LinearFilter, RGBFormat } from 'three';
import RendererStore from '../stores/RendererStore';
import AnimationStore from '../stores/AnimationStore';

export default class Composer extends EffectComposer {
  constructor(renderer) {
    const { width, height } = RendererStore.data;
    const target = new WebGLRenderTarget(width, height, { minFilter: LinearFilter, magFilter: LinearFilter, format: RGBFormat, stencilBuffer: false });
    super(renderer, target);

    RendererStore.addChangeListener( (data)=>{
      const { width, height, resolution } = data;
      this.passes[1].uniforms.resolution.value.set(width * resolution, height * resolution);
    } );

    AnimationStore.addChangeListener( ()=>{
      this.render();
    } );

  }
}
