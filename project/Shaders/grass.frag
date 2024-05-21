#ifdef GL_ES
precision highp float;
#endif

varying float vCoord;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float timeFactor;


void main() {
    vec4 color = texture2D(uSampler, vTextureCoord);
    //write the color varying from top to bottom

    color.r = color.r * (vCoord * 0.3 + 0.2);
    color.g = color.g * (vCoord * 0.3 + 0.2);
    color.b = color.b * (vCoord * 0.3 + 0.2);


    //float green = 0.2 + vCoord * 0.7;

    //gl_FragColor = vec4(0.2, green, 0.2, 1.0);
    gl_FragColor = color;
}
