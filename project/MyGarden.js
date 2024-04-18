import { CGFobject } from "../lib/CGF.js";
import { MyFlower } from "./MyFlower.js";
import { generateRandomNumber } from "./utils.js";

export class MyGarden extends CGFobject {
    constructor(scene, slices, stacks, rows, cols) {
        super(scene);

        this.rows = rows;
        this.cols = cols;
        this.slices = slices;
        this.stacks = stacks;

        const numberOfPetals = generateRandomNumber(15, 10);
        const petalSize = 1 + generateRandomNumber(5, 1) * 0.1;   // 1
        const receptacleRadius = 1 + generateRandomNumber(5, 1) * 0.1; // 1
        const stemRadius = generateRandomNumber(3, 1) * 0.1; // 0.2

        this.flowers = (() => {
            const flowers = [];

            for (let i = 0; i < this.rows * this.stacks; i++) {
                const numberOfPetals = generateRandomNumber(15, 10);
                const petalSize = 1 + generateRandomNumber(5, 1) * 0.1;   // 1
                const receptacleRadius = 1 + generateRandomNumber(5, 1) * 0.1; // 1
                const stemRadius = generateRandomNumber(3, 1) * 0.1; // 0.2

                flowers.push(new MyFlower(scene, this.slices, this.stacks, petalSize, numberOfPetals, receptacleRadius, stemRadius));
            }

            return flowers;
        })();

        this.initBuffers();
    }

    display() {

        const firstRowPos = Math.round(this.rows / 2) * 10;
        const firstColPos = Math.round(this.cols / 2) * 10;

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.scene.pushMatrix();
                this.scene.translate(firstRowPos - (row+1) * 10, 0, firstColPos - (col+1) * 10);
                this.flowers[row * this.rows + col].display();
                this.scene.popMatrix();
            }
        }

        this.initGLBuffers();
    }

    enableNormalViz() {
        this.flowers.forEach((flower) => flower.enableNormalViz());
    }

    disableNormalViz() {
        this.flowers.forEach((flower) => flower.disableNormalViz());
    }
}