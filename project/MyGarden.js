import { CGFobject } from "../lib/CGF.js";
import { MyFlower } from "./MyFlower.js";
import { generateRandomNumber } from "./utils.js";

export class MyGarden extends CGFobject {
    constructor(scene, slices, stacks, rows, cols,sphere,cilinder,semiSphere,triangle,petal_stemAppearance,leafAppearance,flowerAppearance) {
        super(scene);
        this.rows = rows;
        this.cols = cols;
        this.slices = slices;
        this.stacks = stacks;
        this.sphere = sphere;
        this.semiSphere = semiSphere;
        this.cilinder = cilinder;
        this.triangle = triangle;
        this.petal_stemAppearance = petal_stemAppearance;
        this.flowerAppearance = flowerAppearance;
        this.leafAppearance = leafAppearance;
        this.flowers = [];
        this.numFlowers = rows * cols;
        this.initBuffers();
    }

    initBuffers(){
        for (let i = 0; i < this.numFlowers; i++) {
            const numberOfPetals = generateRandomNumber(15, 10);
            const receptacleRadius = 1 + generateRandomNumber(5, 1) * 0.1; // 1
            const stemRadius = generateRandomNumber(3, 1) * 0.1; // 0.2
            const flowerRadius = generateRandomNumber(23, 20) * 0.1;
            const tubeHeight = generateRandomNumber(4, 2);
            const NumberOfTubes = generateRandomNumber(5, 3);
            this.flowers.push(
                new MyFlower(
                    this.scene,
                    this.slices,
                    this.stacks,
                    NumberOfTubes,
                    tubeHeight,
                    numberOfPetals,
                    receptacleRadius,
                    stemRadius,
                    flowerRadius,
                    this.sphere,
                    this.cilinder,
                    this.semiSphere,
                    this.triangle,
                    this.leafAppearance,
                    this.petal_stemAppearance,
                    this.flowerAppearance
                )
            );
        }
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
    }

    updateMatrix(rows, cols) {
        if (rows === this.rows && cols === this.cols) return;

        const newNumber = rows * cols;
        const oldNumber = this.rows * this.cols;
        const diff = newNumber - oldNumber;

        if (diff < 0) {
            this.flowers.splice(this.flowers.length + diff, -diff);
        } else if (diff > 0) {
            this.numFlowers = diff;
            this.initBuffers();
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
