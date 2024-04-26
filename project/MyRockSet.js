import { CGFobject } from "../lib/CGF.js";
import { MyRock } from "./MyRock.js";
import { generateRandomNumber } from "./utils.js";

export class MyRockSet extends CGFobject {
    constructor(scene, slices, stacks, levels) {
        super(scene);
        this.scene = scene;
        this.slices = slices;
        this.stacks = stacks;
        this.levels = levels; // number of levels in the pyramid
        this.rocks = [];

        this.positions = []; // store the positions of the rocks
        let rockId = 0;
        for(let i = 0; i < this.levels; i++) {
            for(let j = 0; j < this.levels - i; j++) {
                for(let k = 0; k < this.levels - i; k++) {
                    this.positions.push([j - (this.levels - i) / 2, i, k - (this.levels - i) / 2]); // adjust position based on level and index
                    let rock = new MyRock(this.scene, this.slices, this.stacks);
                    this.rocks[rockId++] = rock;
                }
            }
        }
    }

    display() {
        for(let i = 0; i < this.positions.length; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.positions[i][0], this.positions[i][1], this.positions[i][2]); // translate to the position of the rock
            this.rocks[i].display();
            this.scene.popMatrix();
        }
    }

    enableNormalViz() {
        this.flowers.forEach((flower) => flower.enableNormalViz());
    }

    disableNormalViz() {
        this.flowers.forEach((flower) => flower.disableNormalViz());
    }
}
