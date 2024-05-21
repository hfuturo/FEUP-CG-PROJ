#ifdef GL_ES
precision highp float;
#endif

varying float vCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;


void main() {
    // Write the swivel value to the fragment color
    float green = 0.2 + vCoord * 0.7;

    gl_FragColor = vec4(0.2, green, 0.2, 1.0);
}
