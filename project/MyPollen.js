import { CGFappearance, CGFobject, CGFtexture } from "../lib/CGF.js";
import { hexToRgbA } from "./utils.js";

export class MyPollen extends CGFobject {
    constructor(scene, sphere, scale, rotation, rotationAxis) {
        super(scene);

        this.sphere = sphere;
        this.scale = scale;
        this.rotation = rotation;
        this.rotationAxis = rotationAxis;

        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(...hexToRgbA("#FFA500"));
        this.material.setDiffuse(...hexToRgbA("#FFA500"));
        this.material.setSpecular(...hexToRgbA("#FFA500"));
        this.material.setTexture(new CGFtexture(this.scene, "images/pollen.avif"));
        this.material.setTextureWrap('REPEAT', 'REPEAT');

        this.initBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(this.rotation, ...this.rotationAxis)
        this.scene.scale(this.scale, 0.5, this.scale);
        this.material.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.sphere.enableNormalViz();
    }

    disableNormalViz() {
        this.sphere.disableNormalViz();
    }
}