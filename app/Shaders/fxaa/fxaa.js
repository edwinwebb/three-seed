/**
https://github.com/mattdesl/three-shader-fxaa
 */

import vertexShader from './fxaa.vert';
import fragmentShader from './fxaa.frag';
import { Vector2, Texture } from 'three';

export const FXAAShader = {
    uniforms: {
        tDiffuse: { type: 't', value: new Texture() },
        resolution: { type: 'v2', value: new Vector2(1 / 1024, 1 / 768) }
    },
    vertexShader,
    fragmentShader
}

