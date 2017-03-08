/**
SSAO algo: http://devlog-martinsh.blogspot.tw/2011/12/ssao-shader-update-v12.html?showComment=1398158188712#c1563204765906693531
log depth http://outerra.blogspot.tw/2013/07/logarithmic-depth-buffer-optimizations.html
convert the exponential depth to a linear value: http://www.ozone3d.net/blogs/lab/20090206/how-to-linearize-the-depth-value/
Spiral sampling http://web.archive.org/web/20120421191837/http://www.cgafaq.info/wiki/Evenly_distributed_points_on_sphere
 */

import vertexShader from './ssao.vert';
import fragmentShader from './ssao.frag';
import { Vector2 } from 'three';

export const SSAOShader = {
    uniforms: {
        "tDiffuse":     { value: null },
        "tDepth":       { value: null },
        "size":         { value: new Vector2( 512, 512 ) },
        "cameraNear":   { value: 1 },
        "cameraFar":    { value: 100 },
        "onlyAO":       { value: 0 },
        "aoClamp":      { value: 0.5 },
        "lumInfluence": { value: 0.5 }
    },
    vertexShader,
    fragmentShader
}
