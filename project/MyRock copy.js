import { CGFappearance, CGFobject } from '../../lib/CGF.js';
/**
* MyRock
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyRock extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        let firstVertices = [];

        let step = 2 * Math.PI / this.slices;
        let stackStep = Math.PI / this.stacks;

        for (let i = 0; i <= this.slices; i++) {
            let ang = step * i;
            for (let j = 0; j <= this.stacks; j++) {
                let stackAng = stackStep * (this.stacks - j) - Math.PI / 2;

                let x = Math.sin(ang) * Math.cos(stackAng);
                let y = Math.sin(stackAng);
                let z = Math.cos(ang) * Math.cos(stackAng);


                // normalization
                let nsize = Math.sqrt(x * x + y * y + z * z);
                x /= nsize;
                y /= nsize;
                z /= nsize;

                let offset = Math.random() * 0.1;
                x += offset * x;
                y += offset * y;
                z += offset * z;

                if (i === 0) {
                    firstVertices.push([x, y, z]);
                }

                if (i === this.slices) {
                    this.vertices.push(firstVertices[j][0], firstVertices[j][1], firstVertices[j][2]);
                }
                else {
                    this.vertices.push(x, y, z);
                }
                this.normals.push(x, y, z);

                this.texCoords.push(i / this.slices, j / this.stacks);

                if (i > 0 && j > 0) {
                    let vertices = this.vertices.length / 3;
                    this.indices.push(vertices - 1, vertices - 2, vertices - this.stacks - 3);
                    this.indices.push(vertices - 1, vertices - this.stacks - 3, vertices - this.stacks - 2);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    display() {
        this.scene.pushMatrix();
        super.display();
        this.scene.popMatrix();
    }

}