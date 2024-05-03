import { CGFobject } from "../lib/CGF.js";

export class MyCircle extends CGFobject {
    constructor(scene, sides) {
        super(scene);
        this.sides = sides;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const angle = 2 * Math.PI / this.sides;

        for (let i = 0; i < this.sides; i++) {
            // vertices
            this.vertices.push(0, 0, 0); // 0
            this.vertices.push(Math.cos(i * angle), Math.sin(i * angle), 0); // 1
            this.vertices.push(Math.cos((i+1) * angle), Math.sin((i+1) * angle), 0); // 2

            // indices
            this.indices.push(
                i*3,        //0
                i*3 + 1,    //1
                i*3 + 2,    //2
                i*3,        //0
                i*3 + 2,    //2
                i*3 + 1     //1
            );   

            // normais
            this.normals.push(
                0, 0, 1,
                0, 0, 1,
                0, 0, 1,
                0, 0, -1,
                0, 0, -1,
                0, 0, -1,
            );

            // texturas
            this.texCoords.push(0, 0);
            this.texCoords.push(Math.cos(i*angle), Math.sin(i*angle));
            this.texCoords.push(Math.cos((i+1)*angle), Math.sin((i+1)*angle));
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}