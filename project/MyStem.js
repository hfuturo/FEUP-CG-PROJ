import { CGFobject } from '../lib/CGF.js';
import { MyLeaf } from './MyLeaf.js';
import { CGFtexture,CGFappearance } from '../lib/CGF.js';
import { generateRandomNumber } from "./utils.js";

/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyStem extends CGFobject {
	constructor(scene, slices, stacks ,numberOfTubes, height, radius, stemColor,cilinder,semiSphere,leaf,petal_stemAppearance) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
		this.numberOfTubes = numberOfTubes;
		this.height = height;
		this.radius = radius;
		this.stemColor = stemColor;
		this.semiSphere = semiSphere;
		this.leaf = leaf;
		this.petal_stemAppearance = petal_stemAppearance;
		this.rotationsY = [];
		this.rotationsZ = [];
		this.heights = [];
		this.leaves = [];
		this.positions = [];
		this.finalx = 0;
		this.finaly = 0;
		this.finalz = 0;
		const deg2rad = Math.PI / 180.0;
		this.cilinder = cilinder;
		for (let i = 0; i < numberOfTubes; i++) {
			this.rotationsY.push(generateRandomNumber(-15,15) * deg2rad);
			this.rotationsZ.push(generateRandomNumber(-15,15)*deg2rad);
			this.heights.push(generateRandomNumber(height-2,height+2));
			this.leaves.push(generateRandomNumber(0,360)*deg2rad);
		}
		this.initBuffers();
	}

	display() {
		this.finalx = 0;
		this.finaly = 0;
		this.finalz = 0;
		var rotateY = 0;
		var rotateZ = 0;
		var value = 0;
		//var totalrotationY = 0;
		for (let i = 0; i < this.numberOfTubes; i++) {
			value = this.heights[i];
			rotateY = this.rotationsY[i];
			rotateZ = this.rotationsZ[i];
			this.scene.pushMatrix();
			this.scene.translate(this.finalx, this.finaly, this.finalz);
			this.scene.rotate(rotateY, 0, 1, 0);
			this.scene.rotate(rotateZ, 0, 0, 1);
			this.scene.scale(this.radius, value, this.radius);
			this.cilinder.display();
			this.scene.popMatrix();

			//first offset
			this.finalx -= ((value) * Math.sin(rotateZ)) * Math.cos(rotateY);
			this.finaly += ((value) * Math.cos(rotateZ));
			this.finalz += ((value) * Math.sin(rotateZ)) * Math.sin(rotateY);
			if (i != this.numberOfTubes-1){
				this.scene.pushMatrix();
				this.scene.translate(this.finalx, this.finaly, this.finalz);
				this.scene.rotate(this.leaves[i], 0, 1, 0);
				this.leaf.display();
				this.scene.popMatrix();
				
				this.scene.pushMatrix();
				this.petal_stemAppearance.apply();
				this.scene.setAmbient(...this.stemColor);
				this.scene.setDiffuse(...this.stemColor);
				this.scene.setSpecular(...this.stemColor);
				this.scene.translate(this.finalx, this.finaly, this.finalz);
				this.scene.scale(this.radius, this.radius, this.radius);
				this.semiSphere.display();
				this.scene.popMatrix();
			}
		}
	}

	enableNormalViz() {
		this.cilinder.enableNormalViz();
	}

	disableNormalViz() {
		this.cilinder.disableNormalViz();
	}

	updateBuffers(complexity) {
		this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

		// reinitialize buffers
		this.initBuffers();
		this.initNormalVizBuffers();
	}
}

