import { CGFobject } from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];

		var ang = 0;
		var alphaAng = 2 * Math.PI / this.slices;

		for (var i = 0; i < this.slices; i++) {
			// All vertices have to be declared for a given face
			// even if they are shared with others, as the normals 
			// in each face will be different

			var sa = Math.sin(ang);
			var saa = Math.sin(ang + alphaAng);
			var ca = Math.cos(ang);
			var caa = Math.cos(ang + alphaAng);

			var step = 1 / this.stacks;
			for (var j = 0; j < this.stacks; j++) {
				this.vertices.push(ca, -sa, j * step); //2
				this.vertices.push(caa, -saa, j * step); //3
				this.vertices.push(ca, -sa, (j + 1) * step); //0
				this.vertices.push(caa, -saa, (j + 1) * step); //1


				// triangle normal computed by cross product of two edges
				var normal = [
					saa - sa,
					caa - ca,
					0
				];

				// normalization
				var nsize = Math.sqrt(
					normal[0] * normal[0] +
					normal[1] * normal[1] +
					normal[2] * normal[2]
				);
				normal[0] /= nsize;
				normal[1] /= nsize;
				normal[2] /= nsize;

				// push normal once for each vertex of this triangle
				this.normals.push(...normal);
				this.normals.push(...normal);
				this.normals.push(...normal);
				this.normals.push(...normal);

				this.indices.push(4 * (i * this.stacks + j), (4 * (i * this.stacks + j) + 2), (4 * (i * this.stacks + j) + 1));
				this.indices.push(4 * (i * this.stacks + j) + 3, (4 * (i * this.stacks + j) + 1), (4 * (i * this.stacks + j) + 2));
			}
			ang += alphaAng;
		}

		var ang = 0;
		var alphaAng = 2 * Math.PI / this.slices;
		this.vertices.push(0, 0, 0)
		this.normals.push(0, 0, -1)
		this.vertices.push(0, 0, 1)
		this.normals.push(0, 0, 1)

		for (var i = 0; i < this.slices; i++) {
			var sa = Math.sin(ang);
			var saa = Math.sin(ang + alphaAng);
			var ca = Math.cos(ang);
			var caa = Math.cos(ang + alphaAng);

			var step = 1 / this.stacks;
			this.vertices.push(ca, -sa, 0);
			this.normals.push(0, 0, -1)
			this.vertices.push(caa, -saa, 0);
			this.normals.push(0, 0, -1)
			this.vertices.push(ca, -sa, 1);
			this.normals.push(0, 0, 1)
			this.vertices.push(caa, -saa, 1);
			this.normals.push(0, 0, 1)
			this.indices.push(this.stacks * this.slices * 4, this.stacks * this.slices * 4 + 4 * i + 2,  this.stacks * this.slices * 4 + 4 * i + 3);
			this.indices.push(this.stacks * this.slices * 4+1,  this.stacks * this.slices * 4 + 4 * i + 5, this.stacks * this.slices * 4 + 4 * i + 4);
			ang += alphaAng;
		}
		console.log(this.vertices);
		console.log(this.indices);
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	updateBuffers(complexity) {
		this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

		// reinitialize buffers
		this.initBuffers();
		this.initNormalVizBuffers();
	}
}

