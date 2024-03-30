#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord+vec2(timeFactor*.001,timeFactor*.001));
	vec4 filter = texture2D(uSampler2, vTextureCoord+vec2(timeFactor*.001,timeFactor*.001));

	
	color.r = color.r * (1.0 - filter.b) ;
	color.g = color.g * (1.0 - filter.b) ;
	color.b = color.b * (1.0 - filter.b) ;


	gl_FragColor = color;
}