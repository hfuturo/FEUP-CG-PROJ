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
        this.tubeHeight = 3;
        this.NumberOfTubes = 3;
        this.flowers = (() => {
            const flowers = [];

            for (let i = 0; i < this.rows * this.cols; i++) {
                const numberOfPetals = generateRandomNumber(15, 10);
                const petalSize = 1 + generateRandomNumber(5, 1) * 0.1; // 1
                const receptacleRadius = 1 + generateRandomNumber(5, 1) * 0.1; // 1
                const stemRadius = generateRandomNumber(3, 1) * 0.1; // 0.2

                flowers.push(
                    new MyFlower(
                        scene,
                        this.slices,
                        this.stacks,
                        this.NumberOfTubes,
                        this.tubeHeight,
                        petalSize,
                        numberOfPetals,
                        receptacleRadius,
                        stemRadius
                    )
                );
            }

            return flowers;
        })();

        this.initBuffers();
    }

    display() {
        const firstRowPos = Math.round(this.rows / 2) * 7;
        const firstColPos = Math.round(this.cols / 2) * 7;

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.scene.pushMatrix();
                this.scene.translate(
                    firstRowPos - (col + 1) * 7,
                    0,
                    firstColPos - (row + 1) * 7
                );
                this.flowers[row * this.cols + col].display();
                this.scene.popMatrix();
            }
        }

        this.initGLBuffers();
    }

    updateMatrix(rows, cols) {
        if (rows === this.rows && cols === this.cols) return;

        const newNumber = rows * cols;
        const oldNumber = this.rows * this.cols;
        const diff = newNumber - oldNumber;

        if (diff < 0) {
            this.flowers.splice(this.flowers.length + diff, -diff);
        } else if (diff > 0) {
            for (let i = 0; i < diff; i++) {
                const numberOfPetals = generateRandomNumber(15, 10);
                const petalSize = 1 + generateRandomNumber(5, 1) * 0.1; // 1
                const receptacleRadius = 1 + generateRandomNumber(5, 1) * 0.1; // 1
                const stemRadius = generateRandomNumber(3, 1) * 0.1; // 0.2

                this.flowers.push(
                    new MyFlower(
                        this.scene,
                        this.slices,
                        this.stacks,
                        this.NumberOfTubes,
                        this.tubeHeight,
                        petalSize,
                        numberOfPetals,
                        receptacleRadius,
                        stemRadius
                    )
                );
            }
        }

        this.rows = rows;
        this.cols = cols;
    }

    enableNormalViz() {
        this.flowers.forEach((flower) => flower.enableNormalViz());
    }

    disableNormalViz() {
        this.flowers.forEach((flower) => flower.disableNormalViz());
    }
}
