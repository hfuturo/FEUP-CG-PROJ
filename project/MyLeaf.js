import {CGFobject} from '../lib/CGF.js';
/**
 * MyLeaf
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyLeaf extends CGFobject {
	constructor(scene, cilinder, triangle, rotationAngle) {
		super(scene);
		
		this.triangle = triangle;
		this.cilinder = cilinder;

		this.rotationAngle = rotationAngle;

		this.initBuffers();
	}
	
	display() {

		const deg2rad = Math.PI/180.0;
		this.scene.pushMatrix();
		this.scene.rotate(deg2rad * 90, 1, 0, 0);
		this.scene.scale(0.005, 1, 0.005);
		this.cilinder.display();
		this.scene.popMatrix();

		// upwards triangle
		this.scene.pushMatrix();
		this.scene.translate(0, 0, 1);
		this.scene.rotate(deg2rad * -90, 1, 0, 0);
		this.scene.scale(0.5,1,1);
		this.triangle.display();
		this.scene.popMatrix();

		// downwards triangle
		this.scene.pushMatrix();
		this.scene.translate(0, 0, 1);
		this.scene.rotate(deg2rad * (90 + this.rotationAngle), 1, 0, 0);
		this.scene.scale(0.5,1,1);
		this.triangle.display();
		this.scene.popMatrix();

		this.initGLBuffers();
	}

	enableNormalViz() {
		this.triangle.enableNormalViz();
	}

	disableNormalViz() {
		this.triangle.disableNormalViz();
	}

	updateBuffers() {
		this.initBuffers();
		this.initNormalVizBuffers();
	}
}

