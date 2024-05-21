
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying float vCoord;
uniform sampler2D uSampler2;

uniform float normScale;

void main() {
	vec3 offset=vec3(0.0,0.0,0.0);
    
    vCoord = aVertexPosition.y;

    vec4 swiveledPosition = vec4(aVertexPosition.x, aVertexPosition.y, aVertexPosition.y*aVertexPosition.y*sin(timeFactor)*0.02, 1.0);

    gl_Position = uPMatrix * uMVMatrix * swiveledPosition;
}

