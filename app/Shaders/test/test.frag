uniform sampler2D tDiffuse;
varying vec2 vUv;
uniform vec2 CENTRE;

#define RADIUS 128.0
void main() {
    vec2 cell = step(0.5, fract(gl_FragCoord.xy/32.0));
    float d = distance(gl_FragCoord.xy, CENTRE);
    vec4 texel = texture2D( tDiffuse, vUv );
    if(d <= RADIUS) {
    texel[0] = 1.0;
    }
    gl_FragColor = texel;
}
