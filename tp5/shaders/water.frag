#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord+vec2(timeFactor*.01,timeFactor*.01));
	vec4 filter = texture2D(uSampler2, vTextureCoord+vec2(timeFactor*.01,timeFactor*.01));

	if (filter.b > 0.5){
		color.r = color.r * (1.0 - filter.b) * 1.5;
		color.g = color.g * (1.0 - filter.b) * 1.5;
		color.b = color.b * (1.0 - filter.b) * 1.5;
	}

	gl_FragColor = color;
}