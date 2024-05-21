#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 filter = texture2D(uSampler2, vTextureCoord+vec2(timeFactor*.01,-timeFactor*.01));

	if(vTextureCoord.y<0.4){
		// Screen blend the color with the filter
		color.r = 1.0 - (1.0 - color.r) * (1.0 - filter.r);
		color.g = 1.0 - (1.0 - color.g) * (1.0 - filter.g);
		color.b = 1.0 - (1.0 - color.b) * (1.0 - filter.b);
	}

	gl_FragColor = color;
}