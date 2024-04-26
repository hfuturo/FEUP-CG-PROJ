import { CGFobject } from '../lib/CGF.js';
/**
 * MyRock
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRock extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
		this.stacks = stacks;
		this.slices = slices * 2;
		this.initBuffers();
	}

	initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        const alphaAng = Math.PI / this.stacks; // vertical angle increment
        const betaAng = 2* Math.PI / this.slices; // horizontal angle increment

        let firstPos=[];
        for(let i = 0; i <= this.slices; i++) {
            let ang = i * betaAng;
            for(let j = 0; j <= this.stacks; j++) {
                let stackAng = alphaAng*(this.stacks - j) - Math.PI / 2 ;


                let x = Math.sin(ang) * Math.cos(stackAng);
                let y = Math.sin(stackAng)/2;
                let z = Math.cos(ang) * Math.cos(stackAng);

                const randomFactor = Math.random() * 0.1; // Adjust the multiplier to get the desired amount of jaggedness
                x += randomFactor * (Math.random() < 0.5 ? -1 : 1);
                y += randomFactor * (Math.random() < 0.5 ? -1 : 1);
                z += randomFactor * (Math.random() < 0.5 ? -1 : 1);
                
                if(i===0){
                    firstPos.push([x,y,z]);
                }
                else if(i === this.slices){
                    x = firstPos[j][0];
                    y = firstPos[j][1];
                    z = firstPos[j][2];
                }
                
                // add the vertex to the array
                this.vertices.push(x , y , z );
                

                this.normals.push(x , y , z );


                this.texCoords.push(i / this.slices, j / this.stacks);

                const first = i * (this.stacks + 1) + j;
                const second = first + this.stacks + 1;
        
                // create the two triangles that make up each square in the grid
                this.indices.push(first + 1, second, first);
                this.indices.push(second + 1, second, first + 1);
            }
        }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

	updateBuffers(verticalSlices,horizontalSlices) {
		this.stacks = 3 + Math.round(9 * verticalSlices); //complexity varies 0-1, so slices varies 3-12
        this.slices = 2 + Math.round(8 * horizontalSlices); //complexity varies 0-1, so stacks varies 2-10
        console.log("Updating sphere with slices: " + this.stacks + " and stacks: " + this.slices);
		// reinitialize buffers
		this.initBuffers();
		this.initNormalVizBuffers();
	}
}

