import { CGFobject } from "../lib/CGF.js";
import { MyGrassBlade } from "./MyGrassBlade.js";
import { generateRandomNumber } from "./utils.js";

export class MyGrass extends CGFobject {
    constructor(scene, stacks, rows, cols) {
        super(scene);
        this.rows = rows;
        this.cols = cols;
        this.stacks = stacks;
        this.grassBlade = new MyGrassBlade(scene, stacks, 6, 0.7);
        this.heights = [];
        this.widths = [];
        this.numgrassBlades = rows * cols;
        // Create an array to store the random offsets
        this.offsets = new Array(rows * cols);
        this.initBuffers();
    }

    initBuffers(){
        for (let i = 0; i < this.rows * this.cols; i++) {
            // Calculate a random offset for each grass blade
            const offsetX = Math.random() * 2 - 1;  // Random number between -1 and 1
            const offsetZ = Math.random() * 2 - 1;  // Random number between -1 and 1
            
            // Store the offset in the array
            this.offsets[i] = {x: offsetX, z: offsetZ};
            const height = Math.random() * (1 - 0.5) + 0.5;
            const width = Math.random() * (1 - 0.5) + 0.5;
            this.heights.push(height);
            this.widths.push(width);
        }
    }

    getgrassBlades() {
        return this.grassBlades;
    }

    display() {
        const firstRowPos = Math.round(this.rows / 2) * 1;  // Reduced spacing
        const firstColPos = Math.round(this.cols / 2) * 1;  // Reduced spacing
    
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.scene.pushMatrix();
    
                // Get the offset from the array
                const offsetX = this.offsets[row * this.cols + col].x;
                const offsetZ = this.offsets[row * this.cols + col].z;
    
                this.scene.scale(this.widths[row * this.cols + col], this.heights[row * this.cols + col], 1); // Uncomment this line to apply the scale
    
                this.scene.translate(
                    firstRowPos - (col + 1) * 1 + offsetX,  // Apply the offset
                    0,
                    firstColPos - (row + 1) * 1 + offsetZ   // Apply the offset
                );
                this.grassBlade.display();
    
                this.scene.popMatrix();
            }
        }
    }

    enableNormalViz() {
        this.grassBlades.forEach((grassBlade) => grassBlade.enableNormalViz());
    }

    disableNormalViz() {
        this.grassBlades.forEach((grassBlade) => grassBlade.disableNormalViz());
    }
}
