import { CGFobject, CGFappearance } from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySphere extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks * 2;
        this.material = new CGFappearance(scene);
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.loadTexture('images/earth.jpg');
        this.material.setTextureWrap('REPEAT', 'REPEAT');
		this.initBuffers();
	}

	initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        const alphaAng = 2 * Math.PI / this.slices; // horizontal angle increment
        const betaAng = Math.PI / this.stacks; // vertical angle increment

        const alphaIncrement = 1 / this.slices;
        const betaIncrement = 1 / this.stacks;
        let beta = 0;

        for(let i = 0; i <= this.stacks; i++) {
            const sinBeta = Math.sin(i * betaAng);
            const cosBeta = Math.cos(i * betaAng);
            
            let alpha = 0;

            for(let j = 0; j <= this.slices; j++) {
                const sinAlpha = Math.sin(j * alphaAng);
                const cosAlpha = Math.cos(j * alphaAng);
    
                // calculate the position of the vertex
                const x = cosAlpha * sinBeta;
                const y = cosBeta;
                const z = sinAlpha * sinBeta;
    
                // add the vertex to the array
                this.vertices.push(x, y, z);
    
                // the normal is the same as the vertex for a unit sphere
                this.normals.push(x, y, z);

                // add textures
                this.texCoords.push(360-alpha, beta);
                alpha += alphaIncrement;
            }
            beta += betaIncrement;
        }
    
        // calculate indices
        for(let i = 0; i < this.stacks; i++) {
            for(let j = 0; j < this.slices; j++) {
                const first = i * (this.slices + 1) + j;
                const second = first + this.slices + 1;
    
                // create the two triangles that make up each square in the grid
                this.indices.push(first + 1, second, first);
                this.indices.push(second + 1, second, first + 1);
            }
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.material.apply();
        super.display();
    }

	updateBuffers(verticalSlices,horizontalSlices) {
		this.slices = 3 + Math.round(9 * verticalSlices); //complexity varies 0-1, so slices varies 3-12
        this.stacks = 2 + Math.round(8 * horizontalSlices); //complexity varies 0-1, so stacks varies 2-10
        console.log("Updating sphere with slices: " + this.slices + " and stacks: " + this.stacks);
		// reinitialize buffers
		this.initBuffers();
		this.initNormalVizBuffers();
	}
}

