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
		this.stacks = stacks;
        this.material = new CGFappearance(scene);
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.loadTexture('images/panorama4.jpg');
        this.material.setTextureWrap('REPEAT', 'REPEAT');
		this.initBuffers();
	}

	initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
    
        var alphaAng = 2 * Math.PI / this.slices; // horizontal angle increment
        var betaAng = Math.PI / this.stacks; // vertical angle increment
    
        for(let i = 0; i <= this.stacks; i++) {
            var sinBeta = Math.sin(i * betaAng);
            var cosBeta = Math.cos(i * betaAng);
    
            for(let j = 0; j <= this.slices; j++) {
                var sinAlpha = Math.sin(j * alphaAng);
                var cosAlpha = Math.cos(j * alphaAng);
    
                // calculate the position of the vertex
                var x = cosAlpha * sinBeta;
                var y = sinAlpha * sinBeta;
                var z = cosBeta;
    
                // add the vertex to the array
                this.vertices.push(x, y, z);
    
                // the normal is the same as the vertex for a unit sphere
                this.normals.push(x, y, z);
            }
        }
    
        // calculate indices
        for(let i = 0; i < this.stacks; i++) {
            for(let j = 0; j < this.slices; j++) {
                var first = i * (this.slices + 1) + j;
                var second = first + this.slices + 1;
    
                // create the two triangles that make up each square in the grid
                this.indices.push(first, second, first + 1);
                this.indices.push(second, second + 1, first + 1);
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

