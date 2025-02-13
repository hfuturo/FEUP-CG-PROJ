import { CGFobject} from '../lib/CGF.js';
/**
 * MyReceptacle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyReceptacle extends CGFobject {
	constructor(scene, sphere,radius) {
		super(scene);
        this.radius = radius;
        this.sphere = sphere;
		this.initBuffers();    
	}

    
	display() {
        this.scene.pushMatrix();
        this.scene.scale(this.radius,this.radius,this.radius);
        this.sphere.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.sphere.enableNormalViz();
    }

    disableNormalViz() {
        this.sphere.disableNormalViz();
    }

	updateBuffers(verticalSlices,horizontalSlices) {
		this.slices = 3 + Math.round(9 * verticalSlices); //complexity varies 0-1, so slices varies 3-12
        this.stacks = 2 + Math.round(8 * horizontalSlices); //complexity varies 0-1, so stacks varies 2-10
		this.initBuffers();
		this.initNormalVizBuffers();
	}
}

