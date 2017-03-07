import vertexShader from './test.vert';
import fragmentShader from './test.frag';
import { Texture, Vector2, Color } from 'three';

export const TestShader = {
    uniforms: {
        tDiffuse: { type: 't', value: new Texture() },
        'CENTRE': { value: new Vector2(256, 256)},
        COLOR: { value: new Color(0xFFFFFF) }
    },
    vertexShader,
    fragmentShader
}
