uniform sampler2D tDiffuse;
varying vec2 vUv;
uniform vec2 CENTRE;
uniform vec3 COLOR;

#define RADIUS 128.0
void main() {
    vec2 cell = step(0.5, fract(gl_FragCoord.xy/32.0));
    float d = distance(gl_FragCoord.xy, CENTRE);
    vec4 texel = texture2D( tDiffuse, vUv );
    if(d <= RADIUS) {
        texel = vec4( COLOR, texel.w );
    }
    gl_FragColor = texel;
}
