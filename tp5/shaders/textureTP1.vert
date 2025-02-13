attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
varying vec4 VertexPosition;

void main() {

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

	vTextureCoord = aTextureCoord;

	VertexPosition = gl_Position;
}

