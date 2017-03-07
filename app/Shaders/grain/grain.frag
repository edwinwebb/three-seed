#ifdef GL_ES
precision mediump float;
#endif


/*
making it look more like actual film grain:
- a constant undulating "burn"
- occasional specks flashing in semi-random looking places

todo:
- revisit horizontal scratches.. kinda hack right now
- hairline specks
- grain animation should be independent of constant burn animation

Using Gorilla Grain's free "Clean" overlay as a reference:
http://gorillagrain.com/features

How it might work in practice in a game:
- Use two shaders; one for the "grain" (which is pretty expensive)
  This only needs to be updated once every 40-50ms
- Another for the constantly moving grain and burns/scratches, which is relatively cheaper
- A move advanced system might add scratches/etc using textures.

@mattdesl
*/

/*
Film Grain post-process shader v1.1
Martins Upitis (martinsh) devlog-martinsh.blogspot.com
2013

--------------------------
This work is licensed under a Creative Commons Attribution 3.0 Unported License.
So you are free to share, modify and adapt it for your needs, and even use it for commercial use.
I would also love to hear about a project you are using it.

Have fun,
Martins
--------------------------

Perlin noise shader by toneburst:
http://machinesdontcare.wordpress.com/2009/06/25/3d-perlin-noise-sphere-vertex-shader-sourcecode/
*/

varying vec2 vUv;
uniform sampler2D texture;

uniform float timer;
uniform vec2 resolution;

float width = resolution.x;
float height = resolution.y;

const float permTexUnit = 1.0/256.0;        // Perm texture texel-size
const float permTexUnitHalf = 0.5/256.0;    // Half perm texture texel-size

uniform float grainamount; //grain amount
uniform bool colored; //colored noise?
uniform float coloramount;
uniform float grainsize; //grain particle size (1.5 - 2.5)
uniform float lumamount; //

//the grain animation
float anim = timer; //too fast right now.. should be more like 41.66 ms

#define Blend(base, blend, funcf)       vec3(funcf(base.r, blend.r), funcf(base.g, blend.g), funcf(base.b, blend.b))
#define BlendSoftLightf(base, blend)    ((blend < 0.5) ? (2.0 * base * blend + base * base * (1.0 - 2.0 * blend)) : (sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend)))
#define BlendLightenf(base, blend)      max(blend, base)

#define BlendSoftLight(base, blend)     Blend(base, blend, BlendSoftLightf)
#define BlendLighten                    BlendLightenf

//a random texture generator, but you can also use a pre-computed perturbation texture
vec4 rnm(in vec2 tc)
{
    float noise =  sin(dot(tc,vec2(anim)+vec2(12.9898,78.233))) * 43758.5453;
    float noiseR =  fract(noise)*2.0-1.0;
    float noiseG =  fract(noise*1.2154)*2.0-1.0;
    float noiseB =  fract(noise*1.3453)*2.0-1.0;
    float noiseA =  fract(noise*1.3647)*2.0-1.0;

    return vec4(noiseR,noiseG,noiseB,noiseA);
}

float fade(in float t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float pnoise3D(in vec3 p)
{
    vec3 pi = permTexUnit*floor(p)+permTexUnitHalf; // Integer part, scaled so +1 moves permTexUnit texel
    // and offset 1/2 texel to sample texel centers
    vec3 pf = fract(p);     // Fractional part for interpolation

    // Noise contributions from (x=0, y=0), z=0 and z=1
    float perm00 = rnm(pi.xy).a ;
    vec3  grad000 = rnm(vec2(perm00, pi.z)).rgb * 4.0 - 1.0;
    float n000 = dot(grad000, pf);
    vec3  grad001 = rnm(vec2(perm00, pi.z + permTexUnit)).rgb * 4.0 - 1.0;
    float n001 = dot(grad001, pf - vec3(0.0, 0.0, 1.0));

    // Noise contributions from (x=0, y=1), z=0 and z=1
    float perm01 = rnm(pi.xy + vec2(0.0, permTexUnit)).a ;
    vec3  grad010 = rnm(vec2(perm01, pi.z)).rgb * 4.0 - 1.0;
    float n010 = dot(grad010, pf - vec3(0.0, 1.0, 0.0));
    vec3  grad011 = rnm(vec2(perm01, pi.z + permTexUnit)).rgb * 4.0 - 1.0;
    float n011 = dot(grad011, pf - vec3(0.0, 1.0, 1.0));

    // Noise contributions from (x=1, y=0), z=0 and z=1
    float perm10 = rnm(pi.xy + vec2(permTexUnit, 0.0)).a ;
    vec3  grad100 = rnm(vec2(perm10, pi.z)).rgb * 4.0 - 1.0;
    float n100 = dot(grad100, pf - vec3(1.0, 0.0, 0.0));
    vec3  grad101 = rnm(vec2(perm10, pi.z + permTexUnit)).rgb * 4.0 - 1.0;
    float n101 = dot(grad101, pf - vec3(1.0, 0.0, 1.0));

    // Noise contributions from (x=1, y=1), z=0 and z=1
    float perm11 = rnm(pi.xy + vec2(permTexUnit, permTexUnit)).a ;
    vec3  grad110 = rnm(vec2(perm11, pi.z)).rgb * 4.0 - 1.0;
    float n110 = dot(grad110, pf - vec3(1.0, 1.0, 0.0));
    vec3  grad111 = rnm(vec2(perm11, pi.z + permTexUnit)).rgb * 4.0 - 1.0;
    float n111 = dot(grad111, pf - vec3(1.0, 1.0, 1.0));

    // Blend contributions along x
    vec4 n_x = mix(vec4(n000, n001, n010, n011), vec4(n100, n101, n110, n111), fade(pf.x));

    // Blend contributions along y
    vec2 n_xy = mix(n_x.xy, n_x.zw, fade(pf.y));

    // Blend contributions along z
    float n_xyz = mix(n_xy.x, n_xy.y, fade(pf.z));

    // We're done, return the final noise value.
    return n_xyz;
}

//2d coordinate orientation thing
vec2 coordRot(in vec2 tc, in float angle)
{
    float aspect = width/height;
    float rotX = ((tc.x*2.0-1.0)*aspect*cos(angle)) - ((tc.y*2.0-1.0)*sin(angle));
    float rotY = ((tc.y*2.0-1.0)*cos(angle)) + ((tc.x*2.0-1.0)*aspect*sin(angle));
    rotX = ((rotX/aspect)*0.5+0.5);
    rotY = rotY*0.5+0.5;
    return vec2(rotX,rotY);
}


highp float rand(vec2 co)
{
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

//good for large clumps of smooth looking noise, but too repetitive
//for small grains
float fastNoise(vec2 n) {
	const vec2 d = vec2(0.0, 1.0);
	vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
	return mix(mix(rand(b), rand(b + d.yx ), f.x), mix(rand(b + d.xy ), rand(b + d.yy ), f.x), f.y);
}



void main( void ) {

	vec2 position = vUv;


	//float c = grain(position, 1.0);
	float c = 1.0;
	vec3 color = vec3(c);

	vec2 texCoord = position.st;



	vec3 rotOffset = vec3(1.425,3.892,5.835); //rotation offset values
	vec2 rotCoordsR = coordRot(texCoord, anim+rotOffset.x);
	vec3 noise = vec3(pnoise3D(vec3(rotCoordsR*vec2(width/grainsize,height/grainsize),0.0)));

	if (colored)
	{
		vec2 rotCoordsG = coordRot(texCoord,anim+ rotOffset.y);
		vec2 rotCoordsB = coordRot(texCoord,anim+ rotOffset.z);

		noise.g = mix(noise.r,pnoise3D(vec3(rotCoordsG*vec2(width/grainsize,height/grainsize),1.0)),coloramount);
		noise.b = mix(noise.r,pnoise3D(vec3(rotCoordsB*vec2(width/grainsize,height/grainsize),2.0)),coloramount);
	}


    vec4 diffuse = texture2D(texture, vUv);
    vec3 col = diffuse.rgb;


	color = noise;
	//constant moving burn
    color += vec3( fastNoise(texCoord*sin(timer*0.1)*3.0 + fastNoise(timer*0.4+texCoord*2.0)) )*0.2;


    vec3 lumcoeff = vec3(0.299,0.587,0.114);
    float luminance = mix(0.0,dot(col, lumcoeff),lumamount);
    float lum = smoothstep(0.2,0.0,luminance);
    lum += luminance;

    color = mix(color,vec3(0.0),pow(lum,4.0));
    col += color*grainamount;

    col = mix(col, BlendSoftLight(col, color), grainamount );


    //large occasional burns
    float specs = fastNoise(texCoord*(10.0+sin(timer)*5.0) + fastNoise(timer+texCoord*50.0) );
    col -= vec3( smoothstep(0.955, 0.96, specs*sin(timer*4.0)  ) )*0.05;
    specs = fastNoise(texCoord*1.0*(10.0+sin(timer)*5.0) - fastNoise(timer+texCoord*40.0) );
    col -= (1.-vec3( smoothstep(0.99, 0.96, (specs)*(sin(cos(timer)*4.0)/2.+0.5)) ))*0.07;

    // // //this is really crappy and should be revisited...
    col -= clamp( 0.1*vec3( smoothstep(0.000001, 0.0000, rand(texCoord.xx*timer) ) * (abs(cos(timer)*sin(timer*1.5))-0.5) ), 0.0, 1.0 );



    // col = color;
    //col = color*grainamount;
    // col = col+color*grainamount;

	gl_FragColor = vec4( col, diffuse.a );
}
