import {CGFobject} from '../lib/CGF.js';
/**
 * MyGrassBlade
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGrassBlade extends CGFobject {
	constructor(scene,stacks,height,width) {
		super(scene);
		this.stacks=stacks;
		this.height=height/stacks;
		this.width=width;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
		this.normals = [];
		this.indices = [];
		this.texCoords = [];	

		let i = 0;
		
		for(i = 0 ; i < this.stacks-1; i++) {
			// vertices
			this.vertices.push(-((this.width / 2)/this.stacks)*(this.stacks-i), i * this.height, 0); // bottom left
			this.vertices.push(((this.width / 2)/this.stacks)*(this.stacks-i), i * this.height, 0); // bottom right
			this.vertices.push(-((this.width / 2)/this.stacks)*(this.stacks-(i+1)), (i + 1) * this.height, 0); // top left
			this.vertices.push(((this.width / 2)/this.stacks)*(this.stacks-(i+1)), (i + 1) * this.height, 0); // top right
	
			// normals
			this.normals.push(0, 0, 1); // bottom left
			this.normals.push(0, 0, 1); // bottom right
			this.normals.push(0, 0, 1); // top left
			this.normals.push(0, 0, 1); // top right
			
	
			// indices
			this.indices.push(i * 4, i * 4 + 1, i * 4 + 2); // first triangle
			this.indices.push(i * 4 + 1, i * 4 + 3, i * 4 + 2); // second triangle
				
			// texture coordinates
			this.texCoords.push(0, i / this.stacks); // bottom left
			this.texCoords.push(1, i / this.stacks); // bottom right
			this.texCoords.push(0, (i + 1) / this.stacks); // top left
			this.texCoords.push(1, (i + 1) / this.stacks); // top right
		}
		// vertices
		this.vertices.push(-((this.width / 2)/this.stacks)*(this.stacks-i), i * this.height, 0); // bottom left
		this.vertices.push(((this.width / 2)/this.stacks)*(this.stacks-i), i * this.height, 0); // bottom right
		this.vertices.push(0, (i + 1) * this.height, 0); // top center

		// normals
		this.normals.push(0, 0, 1); // bottom left
		this.normals.push(0, 0, 1); // bottom right
		this.normals.push(0, 0, 1); // top center

		// indices
		this.indices.push(i * 4, i * 4 + 1, i * 4 + 2); // first triangle
		this.indices.push(i * 4, i * 4 + 2, i * 4 + 1); // first triangle
			
		// texture coordinates
		this.texCoords.push(0, i / this.stacks); // bottom left
		this.texCoords.push(1, i / this.stacks); // bottom right
		this.texCoords.push(0, (i + 1) / this.stacks); // top center
		
		for(i = 0 ; i < this.stacks-1; i++) {
			// vertices
			this.vertices.push(-((this.width / 2)/this.stacks)*(this.stacks-i), i * this.height, 0); // bottom left
			this.vertices.push(((this.width / 2)/this.stacks)*(this.stacks-i), i * this.height, 0); // bottom right
			this.vertices.push(-((this.width / 2)/this.stacks)*(this.stacks-(i+1)), (i + 1) * this.height, 0); // top left
			this.vertices.push(((this.width / 2)/this.stacks)*(this.stacks-(i+1)), (i + 1) * this.height, 0); // top right
	
			// normals
			this.normals.push(0, 0, -1); // bottom left
			this.normals.push(0, 0, -1); // bottom right
			this.normals.push(0, 0, -1); // top left
			this.normals.push(0, 0, -1); // top right
			
	
			// indices
			this.indices.push(i * 4, i * 4 + 2, i * 4 + 1); // first triangle
			this.indices.push(i * 4 + 1, i * 4 + 2, i * 4 + 3); // second triangle
				
			// texture coordinates
			this.texCoords.push(0, i / this.stacks); // bottom left
			this.texCoords.push(1, i / this.stacks); // bottom right
			this.texCoords.push(0, (i + 1) / this.stacks); // top left
			this.texCoords.push(1, (i + 1) / this.stacks); // top right
		}
		// vertices
		this.vertices.push(-((this.width / 2)/this.stacks)*(this.stacks-i), i * this.height, 0); // bottom left
		this.vertices.push(((this.width / 2)/this.stacks)*(this.stacks-i), i * this.height, 0); // bottom right
		this.vertices.push(0, (i + 1) * this.height, 0); // top center

		// normals
		this.normals.push(0, 0, -1); // bottom left
		this.normals.push(0, 0, -1); // bottom right
		this.normals.push(0, 0, -1); // top center

		// indices

		this.indices.push(i * 4, i * 4 + 2, i * 4 + 1); 
			
		// texture coordinates
		this.texCoords.push(1, i / this.stacks); // bottom right
		this.texCoords.push(0, i / this.stacks); // bottom left
		this.texCoords.push(0, (i + 1) / this.stacks); // top center

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

