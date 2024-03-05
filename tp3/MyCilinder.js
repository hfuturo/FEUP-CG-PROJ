import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
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

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

		this.vertices = [];
		this.indices = [];
		this.normals = [];

		var ang = 0;
		var alphaAng = 2*Math.PI/this.slices;

		for(var i = 0; i < this.slices; i++){
			var step = 1/this.stacks;
			this.vertices.push(Math.cos(ang),-Math.sin(ang), 0);
			this.normals.push(Math.cos(ang), -Math.sin(ang), 0);
			for (var j = 0; j < this.stacks; j ++){
				this.vertices.push(Math.cos(ang),-Math.sin(ang), (j+1)*step);
				this.indices.push(i*(this.stacks+1)+j, ((i*(this.stacks+1)+j)+this.stacks+2) % (this.slices*(this.stacks+1)), ((i*(this.stacks+1)+j)+this.stacks+1) % (this.slices*(this.stacks+1)));
				this.indices.push(i*(this.stacks+1)+j, ((i*(this.stacks+1)+j)+1) % (this.slices*(this.stacks+1)), ((i*(this.stacks+1)+j)+this.stacks+2) % (this.slices*(this.stacks+1)));
				this.normals.push(Math.cos(ang), -Math.sin(ang), 0);
			}
			//this.vertices.pop();
			ang+=alphaAng;
		}

		console.log(this.vertices);
		console.log(this.indices);

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

