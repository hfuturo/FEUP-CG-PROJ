import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";
import { hexToRgbA } from "./utils.js";

/**
 * MyInterface
 * @constructor
 */
export class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(scene);
        this.material = null;
        // this.hiveMaterial = new CGFappearance(this.scene);
        // this.hiveMaterial.setAmbient(161/255, 102/255, 47/255, 1);
        // this.hiveMaterial.setDiffuse(161/255, 102/255, 47/255, 1);
        // this.hiveMaterial.setSpecular(161/255, 102/255, 47/255, 1);
        // this.hiveMaterial.setTexture(new CGFtexture(this.scene, "images/hive.jpeg"));
        // this.hiveMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(gl) {
        const deg2rad = Math.PI / 180.0;

        //Left base
        this.scene.pushMatrix();
        this.scene.translate(5.25, -5.25, 5.25);
        this.scene.scale(10.5, 10.5, 10.5);
        if (this.material != null) {
            this.material.apply();
        }
        this.quad.display();
        this.scene.popMatrix();

        //Back base
        this.scene.pushMatrix();
        this.scene.translate(5.25, -5.25, 5.25);
        this.scene.scale(10.5, 10.5, 10.5);
        this.scene.rotate(-90 * deg2rad, 0, 1, 0);
        if (this.material != null) {
            this.material.apply();
        }
        this.quad.display();
        this.scene.popMatrix();

        //Right base
        this.scene.pushMatrix();
        this.scene.translate(5.25, -5.25, 5.25);
        this.scene.scale(10.5, 10.5, 10.5);
        this.scene.rotate(180 * deg2rad, 0, 1, 0);
        if (this.material != null) {
            this.material.apply();
        }
        this.quad.display();
        this.scene.popMatrix();

        //Front base
        this.scene.pushMatrix();
        this.scene.translate(5.25, -5.25, 5.25);
        this.scene.scale(10.5, 10.5, 10.5);
        this.scene.rotate(90 * deg2rad, 0, 1, 0);
        if (this.material != null) {
            this.material.apply();
        }
        this.quad.display();
        this.scene.popMatrix();

        //Down base
        this.scene.pushMatrix();
        this.scene.translate(5.25, -5.25, 5.25);
        this.scene.scale(10.5, 10.5, 10.5);
        this.scene.rotate(90 * deg2rad, 0, 0, 1);
        if (this.material != null) {
            this.material.apply();
        }
        this.quad.display();
        this.scene.popMatrix();

        //Up base
        this.scene.pushMatrix();
        this.scene.translate(5.25, -5.25, 5.25);
        this.scene.scale(10.5, 10.5, 10.5);
        this.scene.rotate(-90 * deg2rad, 0, 0, 1);
        if (this.material != null) {
            this.material.apply();
        }
        this.quad.display();
        this.scene.popMatrix();
    }

    setMaterial(material) {
        this.material = material;
    }
}
