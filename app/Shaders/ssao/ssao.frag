uniform float cameraNear;
uniform float cameraFar;
#ifdef USE_LOGDEPTHBUF
uniform float logDepthBufFC;
#endif
uniform bool onlyAO;
uniform vec2 size;
uniform float aoClamp;
uniform float lumInfluence;
uniform sampler2D tDiffuse;
uniform sampler2D tDepth;
varying vec2 vUv;
#define DL 2.399963229728653
#define EULER 2.718281828459045
const int samples = 8;
const float radius = 5.0;
const bool useNoise = false;
const float noiseAmount = 0.0003;
const float diffArea = 0.4;
const float gDisplace = 0.4;
#include <packing>
vec2 rand( const vec2 coord ) {
vec2 noise;
if ( useNoise ) {
float nx = dot ( coord, vec2( 12.9898, 78.233 ) );
float ny = dot ( coord, vec2( 12.9898, 78.233 ) * 2.0 );
noise = clamp( fract ( 43758.5453 * sin( vec2( nx, ny ) ) ), 0.0, 1.0 );
} else {
float ff = fract( 1.0 - coord.s * ( size.x / 2.0 ) );
float gg = fract( coord.t * ( size.y / 2.0 ) );
noise = vec2( 0.25, 0.75 ) * vec2( ff ) + vec2( 0.75, 0.25 ) * gg;
}
return ( noise * 2.0  - 1.0 ) * noiseAmount;
}
float readDepth( const in vec2 coord ) {
float cameraFarPlusNear = cameraFar + cameraNear;
float cameraFarMinusNear = cameraFar - cameraNear;
float cameraCoef = 2.0 * cameraNear;
#ifdef USE_LOGDEPTHBUF
float logz = unpackRGBAToDepth( texture2D( tDepth, coord ) );
float w = pow(2.0, (logz / logDepthBufFC)) - 1.0;
float z = (logz / w) + 1.0;
#else
float z = unpackRGBAToDepth( texture2D( tDepth, coord ) );
#endif
return cameraCoef / ( cameraFarPlusNear - z * cameraFarMinusNear );
}
float compareDepths( const in float depth1, const in float depth2, inout int far ) {
float garea = 2.0;
float diff = ( depth1 - depth2 ) * 100.0;
if ( diff < gDisplace ) {
garea = diffArea;
} else {
far = 1;
}
float dd = diff - gDisplace;
float gauss = pow( EULER, -2.0 * dd * dd / ( garea * garea ) );
return gauss;
}
float calcAO( float depth, float dw, float dh ) {
float dd = radius - depth * radius;
vec2 vv = vec2( dw, dh );
vec2 coord1 = vUv + dd * vv;
vec2 coord2 = vUv - dd * vv;
float temp1 = 0.0;
float temp2 = 0.0;
int far = 0;
temp1 = compareDepths( depth, readDepth( coord1 ), far );
if ( far > 0 ) {
temp2 = compareDepths( readDepth( coord2 ), depth, far );
temp1 += ( 1.0 - temp1 ) * temp2;
}
return temp1;
}
void main() {
vec2 noise = rand( vUv );
float depth = readDepth( vUv );
float tt = clamp( depth, aoClamp, 1.0 );
float w = ( 1.0 / size.x )  / tt + ( noise.x * ( 1.0 - noise.x ) );
float h = ( 1.0 / size.y ) / tt + ( noise.y * ( 1.0 - noise.y ) );
float ao = 0.0;
float dz = 1.0 / float( samples );
float z = 1.0 - dz / 2.0;
float l = 0.0;
for ( int i = 0; i <= samples; i ++ ) {
float r = sqrt( 1.0 - z );
float pw = cos( l ) * r;
float ph = sin( l ) * r;
ao += calcAO( depth, pw * w, ph * h );
z = z - dz;
l = l + DL;
}
ao /= float( samples );
ao = 1.0 - ao;
vec3 color = texture2D( tDiffuse, vUv ).rgb;
vec3 lumcoeff = vec3( 0.299, 0.587, 0.114 );
float lum = dot( color.rgb, lumcoeff );
vec3 luminance = vec3( lum );
vec3 final = vec3( color * mix( vec3( ao ), vec3( 1.0 ), luminance * lumInfluence ) );
if ( onlyAO ) {
final = vec3( mix( vec3( ao ), vec3( 1.0 ), luminance * lumInfluence ) );
}
gl_FragColor = vec4( final, 1.0 );
}
