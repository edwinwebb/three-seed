varying vec2 vUv;
varying vec2 vCanvasUv;

void main() {
  vUv = uv;
  vCanvasUv = uv;

  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position,1.0);
}
