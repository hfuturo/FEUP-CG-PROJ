import { CGFobject } from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';
import { generateRandomNumber } from './utils.js';
/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
	constructor(scene, slices, stacks, petalSize, numberOfPetals, receptacleRadius, stemRadius) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks;

        this.petalSize = petalSize;
        this.numberOfPetals = numberOfPetals;
        this.receptacleRadius = receptacleRadius;
        this.stemRadius = stemRadius;
        this.stemHeight = 5;

        // angulo que os 2 triangulos fazem entre si
        this.petalRotationAngle = generateRandomNumber(50);

        // angulo de ligação à esfera
        this.unionAngle = (() => {

            const angles = [];
            const angleIncremenet = 360.0 / this.numberOfPetals;

            for (let angle = 0; angle < 360; angle += angleIncremenet)
                angles.push(generateRandomNumber(10, -10));

            return angles;

        })();

        this.stem = new MyStem(scene, this.slices, this.stacks);
        this.receptacle = new MyReceptacle(scene, this.slices, this.stacks);
        this.petal = new MyPetal(scene, this.petalRotationAngle);

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
        this.scene.scale(this.stemRadius, this.stemHeight, this.stemRadius);
        this.scene.setAmbient(...this.stemColor);
        this.scene.setDiffuse(...this.stemColor);
        this.scene.setSpecular(...this.stemColor);
        this.stem.display();
        this.scene.popMatrix();

        // receptacle
        this.scene.pushMatrix();
        this.scene.translate(0, this.stemHeight, 0);
        this.scene.scale(this.receptacleRadius, this.receptacleRadius, this.receptacleRadius);
        this.scene.setAmbient(...this.receptacleColor);
        this.scene.setDiffuse(...this.receptacleColor);
        this.scene.setSpecular(...this.receptacleColor);
        this.receptacle.display();
        this.scene.popMatrix();

        let angleIncremenet = 360.0 / this.numberOfPetals;

        // petals
        for (let angle = 0, i = 0; angle < 360; angle += angleIncremenet, i++) {
            const angleRad = angle * deg2rad;

            this.scene.pushMatrix();

            // coloca petalas no sitio correto
            this.scene.translate(-this.receptacleRadius*1.3 * Math.sin(angleRad), this.receptacleRadius*1.3 * Math.cos(angleRad), 0);
            
            // junta petalas no centro da esfera
            this.scene.translate(Math.sin(angleRad), -Math.cos(angleRad), 0);
            
            // translação para o nível da esfera
            this.scene.translate(0, this.stemHeight, 0);

            // aplica angulo de união da pétal ao coração
            this.scene.rotate(deg2rad * this.unionAngle[i], 1, 0, 0);

            // aplica rotação para formar um circulo à volta do coração
            this.scene.rotate(angleRad, 0, 0, 1);

            // tamanho das petalas
            this.scene.scale(this.petalSize / 2, this.petalSize, this.petalSize / 2);
            
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
        return this.hexToRgbA(colors[generateRandomNumber(colors.length - 1)])
    }

}

