import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, -0.5,	//0
			-0.5, -0.5,  0.5,	//1
			-0.5,  0.5, -0.5,	//2
			-0.5,  0.5,  0.5,	//3
			 0.5, -0.5, -0.5,	//4
			 0.5, -0.5,  0.5,	//5
			 0.5,  0.5, -0.5,	//6
			 0.5,  0.5,  0.5	//7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2, //esquerda
			1, 3, 2,

			1, 5, 7, //frete
			1, 7, 3,

			3, 7, 6,  //cima
			3, 6, 2,

			0, 4, 5,  //baixo
			0, 5, 1,
			
			5, 4, 6,  //direita
			5, 6, 7,

			4, 0, 2, //trás
			4, 2, 6

		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

