
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying float vCoord;
varying vec2 vTextureCoord;

uniform float normScale;

void main() {
    vCoord = aVertexPosition.y;
    vTextureCoord = aTextureCoord;
    vec4 swiveledPosition = vec4(aVertexPosition.x, aVertexPosition.y, aVertexPosition.y*aVertexPosition.y*sin(timeFactor)*0.02, 1.0);

    gl_Position = uPMatrix * uMVMatrix * swiveledPosition;
}

