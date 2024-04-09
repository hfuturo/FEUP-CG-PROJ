import { CGFobject } from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';
/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks;

        this.stem = new MyStem(scene, this.slices, this.stacks);
        this.receptacle = new MyReceptacle(scene, this.slices, this.stacks);
        this.petal = new MyPetal(scene);

		this.initBuffers();
	}

	display() {

        const deg2rad = Math.PI/180.0;

        // stem
        this.scene.pushMatrix();
        this.scene.scale(0.2, 5, 0.2);
        this.scene.setAmbient(1/255, 50/255, 32/255, 1);
        this.scene.setDiffuse(1/255, 50/255, 32/255, 1);
        this.scene.setSpecular(1/255, 50/255, 32/255, 1);
        this.stem.display();
        this.scene.popMatrix();

        // receptacle
        this.scene.pushMatrix();
        this.scene.translate(0, 5, 0);
        this.scene.setAmbient(196/255, 164/255, 132/255, 1);
        this.scene.setDiffuse(196/255, 164/255, 132/255, 1);
        this.scene.setSpecular(196/255, 164/255, 132/255, 1);
        this.receptacle.display();
        this.scene.popMatrix();

        // petals
        for (let angle = 0; angle < 360; angle += 30) {
            if (angle == 180) continue;

            const angleRad = angle * deg2rad;

            this.scene.pushMatrix();
            this.scene.scale(0.5, 0.5, 0.5);
            this.scene.translate(0, 10, 0);
            this.scene.rotate(angleRad, 0, 0, 1);
            this.scene.translate(0, 1, 0);
            this.scene.setAmbient(255/255, 215/255, 0/255, 1);
            this.scene.setDiffuse(255/255, 215/255, 0/255, 1);
            this.scene.setSpecular(255/255, 215/255, 0/255, 1);
            this.petal.display();

            this.scene.popMatrix();
        }

		this.initGLBuffers();
	}

    enableNormalViz() {
        this.stem.enableNormalViz();
        this.receptacle.enableNormalViz();
        this.petal.enableNormalViz();
    }

    disableNormalViz() {
        this.stem.disableNormalViz();
        this.receptacle.disableNormalViz();
        this.petal.disableNormalViz();
    }

	updateBuffers(complexity) {
		this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

		// reinitialize buffers
		this.initBuffers();
		this.initNormalVizBuffers();
	}
}

