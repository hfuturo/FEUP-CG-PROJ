import { CGFobject } from '../lib/CGF.js';
/**
 * MyCilinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCilinder extends CGFobject {
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
		this.texCoords = [];

		const alphaAng = 2 * Math.PI / this.slices;
		const step = 1 / this.stacks;

		let ang = 0;

		for (let i = 0; i < this.slices; i++) {
			this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
			this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
			this.texCoords.push(0.5 + 0.5 * Math.cos(ang), 0.5 - 0.5 * Math.sin(ang));
			for (let j = 0; j < this.stacks; j++) {
				this.vertices.push(Math.cos(ang), (j + 1) * step, -Math.sin(ang));-Math.sin(ang)
				this.indices.push(i * (this.stacks + 1) + j, ((i * (this.stacks + 1) + j) + this.stacks + 1) % (this.slices * (this.stacks + 1)), ((i * (this.stacks + 1) + j) + this.stacks + 2) % (this.slices * (this.stacks + 1)));
				this.indices.push(i * (this.stacks + 1) + j, ((i * (this.stacks + 1) + j) + this.stacks + 2) % (this.slices * (this.stacks + 1)), ((i * (this.stacks + 1) + j) + 1) % (this.slices * (this.stacks + 1)));
				this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
				this.texCoords.push(i / this.slices, j * step);
			}
			ang += alphaAng;
		}

		this.vertices.push(0, 0, 0)
		this.normals.push(0, -1, 0)
		this.vertices.push(0, 1, 0)
		this.normals.push(0, 1, 0)
		this.texCoords.push(0.5, 0.5);
		this.texCoords.push(0.5, 0.5);

		ang = 0;

		for (let i = 0; i < this.slices; i++) {
			this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
			this.normals.push(0, -1, 0);
			this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));
			this.normals.push(0, 1, 0);
			this.texCoords.push(0.5 + 0.5 * Math.cos(ang), 0.5 - 0.5 * Math.sin(ang));
			this.texCoords.push(0.5 + 0.5 * Math.cos(ang), 0.5 - 0.5 * Math.sin(ang));
			if (i > this.slices - 2) {
				this.indices.push(this.slices * (1 + this.stacks), this.slices * (1 + this.stacks)+2, this.slices * (1 + this.stacks) + 2 + 2 * i);
				this.indices.push(this.slices * (1 + this.stacks)+1, this.slices * (1 + this.stacks) + 3 + 2 * i, this.slices * (1 + this.stacks)+3);
				this.texCoords.push(0.5, 0.5);
				this.texCoords.push(0.5, 0.5);
			}
			else {
				this.indices.push(this.slices * (1 + this.stacks), this.slices * (1 + this.stacks) + 4 + 2 * i, this.slices * (1 + this.stacks) + 2 + 2 * i);
				this.indices.push(this.slices * (1 + this.stacks)+1, this.slices * (1 + this.stacks) + 3 + 2 * i, this.slices * (1 + this.stacks) + 5 + 2 * i);
				this.texCoords.push(i / this.slices, 0);
				this.texCoords.push(i / this.slices, 1);
			}

			ang += alphaAng;
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
		this.updateTexCoordsGLBuffers();
	}

	updateBuffers(complexity) {
		this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

		// reinitialize buffers
		this.initBuffers();
		this.initNormalVizBuffers();
	}

}

