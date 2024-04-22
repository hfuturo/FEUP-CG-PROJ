import { CGFobject } from '../lib/CGF.js';
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySemiSphere extends CGFobject {
	constructor(scene, slices, stacks, insideOut = false, putTextures = false) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks * 2;
        this.insideOut = insideOut;
        this.putTextures = putTextures;
		this.initBuffers();
	}

	initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        if (this.putTextures) 
            this.texCoords = [];
    
        const alphaAng = 2 * Math.PI / this.slices; // horizontal angle increment
        const betaAng = Math.PI / (this.stacks ); // vertical angle increment

        const alphaIncrement = 1 / (this.stacks );
        const betaIncrement = 1 / (this.stacks );
        let beta = 0;

        for(let i = 2 * this.stacks / 5; i <= this.stacks * 3 / 5; i++) {
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
                
                if (this.insideOut) {
                    this.normals.push(-x, -y, -z);
                }
                else{
                    // the normal is the same as the vertex for a unit sphere
                    this.normals.push(x, y, z);
                }

                // add textures
                if (this.putTextures)
                    this.texCoords.push(360-alpha, beta);

                alpha += alphaIncrement;
            }
            beta += betaIncrement;
        }
    
        // calculate indices
        for(let i = 0; i < (this.stacks * 3 / 5-2 * this.stacks / 5); i++) {
            for(let j = 0; j < this.slices; j++) {
                const first = i * (this.slices + 1) + j;
                const second = first + this.slices + 1;
    
                // create the two triangles that make up each square in the grid
                if (this.insideOut) {
                    this.indices.push(second, first + 1, first);
                    this.indices.push(second, second + 1, first + 1);
                } else {
                    this.indices.push(first + 1, second, first);
                    this.indices.push(second + 1, second, first + 1);
                }
            }
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
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

