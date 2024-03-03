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
			-0.5, -0.5, -0.5,	//0 E left
			-0.5, -0.5, -0.5,	//1 E Back
			-0.5, -0.5, -0.5,	//2 E Bottom
			-0.5, -0.5,  0.5,	//3 F left
			-0.5, -0.5,  0.5,	//4 F Front
			-0.5, -0.5,  0.5,	//5 F Bottom
			-0.5,  0.5, -0.5,	//6 G left
			-0.5,  0.5, -0.5,	//7 G Back
			-0.5,  0.5, -0.5,	//8 G Top
			-0.5,  0.5,  0.5,	//9 H left
			-0.5,  0.5,  0.5,	//10 H Front
			-0.5,  0.5,  0.5,	//11 H Top
			 0.5, -0.5, -0.5,	//12 B right 
			 0.5, -0.5, -0.5,	//13 B Back
			 0.5, -0.5, -0.5,	//14 B Bottom
			 0.5, -0.5,  0.5,	//15 A right
			 0.5, -0.5,  0.5,	//16 A Front
			 0.5, -0.5,  0.5,	//17 A Bottom
			 0.5,  0.5, -0.5,	//18 D right
			 0.5,  0.5, -0.5,	//19 D Back
			 0.5,  0.5, -0.5,	//20 D Top
			 0.5,  0.5,  0.5,	//21 C right
			 0.5,  0.5,  0.5,	//22 C Front
			 0.5,  0.5,  0.5	//23 C Top
		];

		this.normals = [
			-1, 0, 0,	//0
			0, 0, -1,	//1
			0, -1, 0,	//2
			-1, 0, 0,	//3
			0, 0, 1,	//4
			0, -1, 0,	//5
			-1, 0, 0,	//6
			0, 0, -1,	//7
			0, 1, 0,	//8
			-1, 0, 0,	//9
			0, 0, 1,	//10
			0, 1, 0,	//11
			1, 0, 0,	//12
			0, 0, -1,	//13
			0, -1, 0,	//14
			1, 0, 0,	//15
			0, 0, 1,	//16
			0, -1, 0,	//17
			1, 0, 0,	//18
			0, 0, -1,	//19
			0, 1, 0,	//20
			1, 0, 0,	//21
			0, 0, 1,	//22
			0, 1, 0		//23
		];	
		//Counter-clockwise reference of vertices
		this.indices = [
			0, 3, 6, //esquerda
			3, 9, 6,

			4, 16, 22,  //frente
			4, 22, 10,

			11, 23, 20,  //cima
			11, 20, 8,

			2, 14, 17,  //baixo
			2, 17, 5,
			
			15, 12, 18,  //direita
			15, 18, 21,

			13, 1, 7, //trás
			13, 7, 19

		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	updateBuffers(complexity){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

