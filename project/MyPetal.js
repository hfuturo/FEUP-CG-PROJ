import {CGFobject} from '../lib/CGF.js';
/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPetal extends CGFobject {
	constructor(scene,triangle, rotationAngle,petalSize) {
		super(scene);
		
		this.triangle = triangle;

		this.rotationAngle = rotationAngle;

		this.petalSize = petalSize;

		this.initBuffers();
	}
	
	display() {

		const deg2rad = Math.PI/180.0;
		
		// upwards triangle
		this.scene.pushMatrix();
		this.scene.translate(0, 1, 0);
		this.scene.rotate(deg2rad * -this.rotationAngle, 1, 0, 0);
		this.scene.scale(this.petalSize / 2, this.petalSize, this.petalSize / 2);
		this.triangle.display();
		this.scene.popMatrix();

		// downwards triangle
		this.scene.pushMatrix();
		this.scene.translate(0, 1, 0);
		this.scene.rotate(deg2rad * 180, 1, 0, 0);
		this.scene.scale(this.petalSize / 2, this.petalSize, this.petalSize / 2);
		this.triangle.display();
		this.scene.popMatrix();
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

