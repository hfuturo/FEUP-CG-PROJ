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
	constructor(scene, slices, stacks, numberOfPetals) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks;

        this.stem = new MyStem(scene, this.slices, this.stacks);
        this.receptacle = new MyReceptacle(scene, this.slices, this.stacks);
        this.petal = new MyPetal(scene);

        this.numberOfPetals = numberOfPetals;

        this.petalColors = ["#ff7b00", "#ff8800", "#ff9500", "#ffa200", "#ffaa00", "#ffb700", "#ffc300", "#ffd000", "#ffdd00", "#ffea00"];
        this.petalColor = this.getRandomColor(this.petalColors);
        this.receptacleColors = ["#ede0d4", "#e6ccb2", "#ddb892", "#b08968", "#7f5539", "#9c6644"];
        this.receptacleColor = this.getRandomColor(this.receptacleColors);
        this.stemColors = ["#004b23", "#006400", "#007200", "#008000", "#38b000", "#70e000", "#9ef01a", "#ccff33"];
        this.stemColor = this.getRandomColor(this.stemColors);

		this.initBuffers();
	}

	display() {

        const deg2rad = Math.PI/180.0;
        
        // stem
        this.scene.pushMatrix();
        this.scene.scale(0.2, 5, 0.2);
        this.scene.setAmbient(...this.stemColor);
        this.scene.setDiffuse(...this.stemColor);
        this.scene.setSpecular(...this.stemColor);
        this.stem.display();
        this.scene.popMatrix();

        // receptacle
        this.scene.pushMatrix();
        this.scene.translate(0, 5, 0);
        this.scene.setAmbient(...this.receptacleColor);
        this.scene.setDiffuse(...this.receptacleColor);
        this.scene.setSpecular(...this.receptacleColor);
        this.receptacle.display();
        this.scene.popMatrix();

        let angleIncremenet = 360.0 / this.numberOfPetals;

        // petals
        for (let angle = 0; angle < 360; angle += angleIncremenet) {
            if (angle == 180) continue;

            const angleRad = angle * deg2rad;

            this.scene.pushMatrix();
            this.scene.scale(0.5, 0.5, 0.5);
            this.scene.translate(0, 10, 0);
            this.scene.rotate(angleRad, 0, 0, 1);
            this.scene.translate(0, 1, 0);
            this.scene.setAmbient(...this.petalColor);
            this.scene.setDiffuse(...this.petalColor);
            this.scene.setSpecular(...this.petalColor);
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

    hexToRgbA(hex)
    {
        let ret;
        //either we receive a html/css color or a RGB vector
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            ret=[
                parseInt(hex.substring(1,3),16).toPrecision()/255.0,
                parseInt(hex.substring(3,5),16).toPrecision()/255.0,
                parseInt(hex.substring(5,7),16).toPrecision()/255.0,
                1.0
            ];
        }
        else
            ret=[
                hex[0].toPrecision()/255.0,
                hex[1].toPrecision()/255.0,
                hex[2].toPrecision()/255.0,
                1.0
            ];
        return ret;
    }

    getRandomColor(colors) {
        return this.hexToRgbA(colors[parseInt(Math.random() * (colors.length - 1))]);
    }
}

