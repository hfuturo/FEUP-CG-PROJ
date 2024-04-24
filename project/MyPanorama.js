import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPanorama extends CGFobject {
	constructor(scene, slices, stacks, texture) {
		super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.texture = texture;
		this.initBuffers();
	}

    initBuffers() {
        this.Sphere = new MySphere(this.scene, this.slices, this.stacks, true, true);
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0, 0, 0, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0, 0, 0, 1);
        this.material.setShininess(10.0);
        this.material.loadTexture('images/' + this.texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }
    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);  
        this.scene.scale(200, 200, 200);
        this.material.apply();
        this.Sphere.display();
        this.scene.popMatrix();
    }
}

