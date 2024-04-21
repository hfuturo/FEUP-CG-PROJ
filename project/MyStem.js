import { CGFobject } from '../lib/CGF.js';
import { MyCilinder } from './MyCilinder.js';
import { MySphere } from './MySphere.js';
import { MyLeaf } from './MyLeaf.js';
import { CGFtexture,CGFappearance } from '../lib/CGF.js';
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyStem extends CGFobject {
	constructor(scene, slices, stacks ,numberOfTubes, height, radius) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
		this.numberOfTubes = numberOfTubes;
		console.log("numberOfTubes: " + numberOfTubes);
		this.height = height;
		this.radius = radius;
		this.rotationsY = [];
		this.rotationsZ = [];
		this.heights = [];
		this.leafs = [];
		this.finalx = 0;
		this.finaly = 0;
		this.finalz = 0;
		const deg2rad = Math.PI / 180.0;
		this.cilinder = new MyCilinder(scene, slices, stacks);
		for (let i = 0; i < numberOfTubes; i++) {
			// random rotations
			this.rotationsY.push((Math.random() * 30 - 15) * deg2rad);
			this.rotationsZ.push((Math.random() * 30 - 15)*deg2rad);
			this.heights.push(Math.random() * height );
			this.leafs.push(Math.random() * 360 * deg2rad);
			this.cilinder.setTextureCoords(new Array(this.slices * this.stacks).fill(0).map((_, i) => i % this.slices / (this.slices - 1), i));

			//this.rotationsY.push(deg2rad * 20 * i);
			//this.rotationsZ.push(deg2rad * 10 * i);
		}
		this.sphere = new MySphere(scene, slices, stacks);
		
		this.texture2 = new CGFtexture(this.scene, "images/stem.png");
		this.appearance2 = new CGFappearance(this.scene);
		this.appearance2.setTexture(this.texture2);
		this.appearance2.setTextureWrap('REPEAT', 'REPEAT');
		this.leaf = new MyLeaf(scene, 20);
		this.initBuffers();
	}

	display() {
		// deg2rad
		/*
		// First Cylinder
		this.scene.pushMatrix();
		let frontFirstRotation = Math.PI-Math.PI/8
		this.scene.rotate(frontFirstRotation,1,0,0)
		this.scene.translate(0,this.height/2, -this.height/2) // Places the bottom left corner in (0,0,0)
		this.scene.rotate(Math.PI/2, 1, 0, 0)
		this.scene.scale(this.height, this.height, this.height)
		this.cilinder.display();
		this.scene.popMatrix();

		// Second Cylinder
		this.scene.pushMatrix();
		let radius = this.radius*2 * this.height;
		let x_translation = 0;
		let y_translation = Math.sin(frontFirstRotation+Math.PI/2)*radius;
		let z_translation = -Math.cos(frontFirstRotation+Math.PI/2)*radius;
		let small_radius = this.radius*2 * this.height;
		y_translation += Math.sin(Math.PI/8)*small_radius;
		z_translation += Math.cos(Math.PI/8)*small_radius;
		this.scene.translate(x_translation, y_translation, z_translation);
		let frontSecondRotation = -Math.PI/2 + Math.PI/16;
		this.scene.rotate(frontSecondRotation,1,0,0);
		this.scene.translate(0,this.height/2, -this.radius/2); // Places the bottom left corner in (0,0,0)
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.scale(this.height, this.radius, this.height);
		this.cilinder.display();
		this.scene.popMatrix();
		*/
		const deg2rad = Math.PI / 180.0;
		var x = 0;
		var y = 0;
		var z = 0
		var rotateY = 0;
		var rotateZ = 0;
		for (let i = 0; i < this.numberOfTubes; i++) {
			//random value around this.height / this.numberOfTubes
			var value = this.heights[i];
			rotateY = this.rotationsY[i];
			rotateZ = this.rotationsZ[i];
			this.scene.pushMatrix();
			this.appearance2.apply();
			this.scene.translate(x, y, z);
			this.scene.rotate(rotateY, 0, 1, 0);
			this.scene.rotate(rotateZ, 0, 0, 1);
			this.scene.scale(this.radius, value, this.radius);
			this.cilinder.display();
			this.scene.popMatrix();

			if (i != 0){
				this.scene.pushMatrix();
				this.scene.translate(x, y, z);
				//random rotation between 0 and 360
				this.scene.rotate(this.leafs[i], 0, 1, 0);
				this.leaf.display();
				this.scene.popMatrix();
			}
			//first offset
			x -= ((value) * Math.sin(rotateZ)) * Math.cos(rotateY);
			y += ((value) * Math.cos(rotateZ));
			z += ((value) * Math.sin(rotateZ)) * Math.sin(rotateY);

			this.scene.pushMatrix();
			this.scene.translate(x, y, z);
			this.scene.scale(this.radius, this.radius, this.radius );
			this.sphere.display();
			this.scene.popMatrix();

			/*
			//calculate the unitary vector
			var vectorx = Math.cos(rotateZ) * Math.cos(rotateY);
			var vectory = Math.sin(rotateZ);
			var vectorz = Math.cos(rotateZ) * Math.sin(rotateY);
			var vectorLength = Math.sqrt(vectorx * vectorx + vectory * vectory + vectorz * vectorz);
			vectorx /= vectorLength;
			vectory /= vectorLength;
			vectorz /= vectorLength;

			var angle = 20 * Math.PI / 180; // Convert the angle to radians
			var rotatedVectorX = vectorx * Math.cos(angle) + vectorz * Math.sin(angle);
			var rotatedVectorZ = -vectorx * Math.sin(angle) + vectorz * Math.cos(angle);

			vectorx = rotatedVectorX;
			vectorz = rotatedVectorZ;
			
			this.scene.pushMatrix();
			this.scene.translate(x, y, z);
			this.scene.scale(this.radius / 20, this.radius / 20, this.radius / 20);
			this.sphere.display();
			this.scene.popMatrix();
			//second offset
			//var testX = x + (Math.cos(rotateZ) * this.radius * Math.cos(rotateY + this.rotationsY[i + 1]));
			//var testY = y + (Math.sin(rotateZ) * this.radius * Math.sin(rotateY + this.rotationsY[i + 1]));
			//var testZ = z - (Math.cos(rotateZ) * this.radius * Math.sin(rotateY + this.rotationsY[i + 1]));
			var testX = x + vectorx;
			var testY = y + vectory;
			var testZ = z - vectorz;
			this.scene.pushMatrix();
			this.scene.translate(testX, testY, testZ);
			this.scene.scale(this.radius / 5, this.radius / 5, this.radius / 5);
			this.sphere.display();
			this.scene.popMatrix();
			//third offset
			//testX = x + Math.cos(rotateZ + this.rotationsZ[i + 1]) * this.radius * Math.cos(rotateY + this.rotationsY[i + 1]);
			//testY = y + Math.sin(rotateZ + this.rotationsZ[i + 1]) * this.radius * Math.sin(rotateY + this.rotationsY[i + 1]);
			//testZ = z - Math.cos(rotateZ + this.rotationsZ[i + 1]) * this.radius * Math.sin(rotateY + this.rotationsY[i + 1]);
			//print angles in degrees
			console.log("rotateY: " + rotateY * 180 / Math.PI + " rotateZ: " + rotateZ * 180 / Math.PI);
			console.log("rotateY2: " + (rotateY + this.rotationsY[i + 1]) * 180 / Math.PI + " rotateZ2: " + (rotateZ + this.rotationsZ[i + 1]) * 180 / Math.PI);
			this.scene.pushMatrix();
			this.scene.translate(testX, testY, testZ);
			this.scene.scale(this.radius / 20, this.radius / 20, this.radius / 20);
			this.sphere.display();
			this.scene.popMatrix();

			//x += (Math.cos(rotateZ) * this.radius * Math.cos(rotateY * 2 + this.rotationsY[i + 1])) - Math.cos(this.rotationsZ[i + 1] + rotateZ) * this.radius * Math.cos(rotateY * 2 + this.rotationsY[i + 1]);
			//y += ((Math.sin(rotateZ) * this.radius * Math.sin(rotateY + this.rotationsY[i + 1])) - Math.sin(this.rotationsZ[i + 1] + rotateZ) * this.radius * Math.cos(rotateY + this.rotationsY[i + 1]));
			//z += (-(Math.cos(rotateZ) * this.radius * Math.sin(rotateY * 2 + this.rotationsY[i + 1])) + Math.cos(this.rotationsZ[i + 1] + rotateZ) * this.radius * Math.sin(rotateY * 2 + this.rotationsY[i + 1]));
			*/
		}
		this.finalx = x;
		this.finaly = y;
		this.finalz = z;

		/*
		this.scene.pushMatrix();
		this.scene.scale(this.radius, this.height / 4, this.radius);
		this.cilinder.display();
		this.scene.popMatrix();
		var x = this.radius - this.radius * Math.cos(deg2rad * 20);
		//var x = ((Math.cos(deg2rad*(90-20))**2)*this.radius);
		var y = (this.height / 4) - this.radius * Math.sin(deg2rad * 20);
		var z = 0;
		//var y = (this.height/4)-((Math.cos(deg2rad*(90-20))*Math.sin(deg2rad*(90-20)))*this.radius);
		this.scene.pushMatrix();
		this.scene.translate(x, y, 0);
		this.scene.rotate(deg2rad * 20, 0, 0, 1);
		this.scene.scale(this.radius, this.height / 4, this.radius);
		this.cilinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		x -= ((this.height / 4) * Math.sin(deg2rad * 20));
		y += ((this.height / 4) * Math.cos(deg2rad * 20));
;
		this.scene.translate(
			x - (Math.cos(deg2rad * 20) * this.radius - Math.cos(deg2rad * 10) * this.radius),
			  y - (Math.sin(deg2rad * 20) * this.radius - Math.sin(deg2rad * 10) * this.radius), 
			  z - (this.radius - this.radius * Math.cos(deg2rad * 30)));
		
		this.scene.rotate(deg2rad * 10, 0, 0, 1);
		this.scene.rotate(deg2rad * 30, 1, 0, 0);
		this.scene.scale(this.radius, this.height / 4, this.radius);

		this.cilinder.display();
		this.scene.popMatrix();
		*/
		this.initGLBuffers();
	}

	enableNormalViz() {
		this.cilinder.enableNormalViz();
	}

	disableNormalViz() {
		this.cilinder.disableNormalViz();
	}

	updateBuffers(complexity) {
		this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

		// reinitialize buffers
		this.initBuffers();
		this.initNormalVizBuffers();
	}
}

