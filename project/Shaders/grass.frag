#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;


void main() {
    // Write the swivel value to the fragment color
    gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
}
