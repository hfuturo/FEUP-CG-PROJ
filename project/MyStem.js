import { CGFobject } from '../lib/CGF.js';
import { MyCilinder } from './MyCilinder.js';
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyStem extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);

		this.cilinder = new MyCilinder(scene, slices, stacks);

		this.initBuffers();
	}

	display() {
		this.scene.pushMatrix();
		this.cilinder.display();
		this.scene.popMatrix();

		this.initGLBuffers();
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

