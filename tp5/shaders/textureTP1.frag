#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec4 VertexPosition;
uniform sampler2D uSampler;

void main() {
	gl_FragColor = texture2D(uSampler, vTextureCoord);

	if (VertexPosition.y>0.5){
		gl_FragColor = vec4(255.0,255.0,0.0,1.0);
	}
	else {
		gl_FragColor = vec4(0.0,0.0,255.0,1.0);
	}
	
}


