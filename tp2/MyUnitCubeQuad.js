import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';


/**
* MyInterface
* @constructor
*/
export class MyUnitCubeQuad extends CGFobject {

    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(scene)
    }

    display() {

        const deg2rad=Math.PI/180.0;
        
        //Left base
        this.scene.pushMatrix();
        this.scene.translate(5.25,-5.25,5.25)
        this.scene.scale(10.5,10.5,10.5)
        this.scene.setAmbient(1, 1, 1, 1);
        this.scene.setDiffuse(1, 1, 1, 1);
        this.quad.display();
        this.scene.popMatrix();
        
        //Back base
        this.scene.pushMatrix();
        this.scene.translate(5.25,-5.25,5.25)
        this.scene.scale(10.5,10.5,10.5)
        this.scene.rotate(-90 * deg2rad, 0, 1, 0);
        this.scene.setAmbient(1, 1, 1, 1);
        this.scene.setDiffuse(1, 1, 1, 1);
        this.quad.display();
        this.scene.popMatrix();

        //Right base
        this.scene.pushMatrix();
        this.scene.translate(5.25,-5.25,5.25)
        this.scene.scale(10.5,10.5,10.5)
        this.scene.rotate(180 * deg2rad, 0, 1, 0);
        this.scene.setAmbient(1, 1, 1, 1);
        this.scene.setDiffuse(1, 1, 1, 1);
        this.quad.display();
        this.scene.popMatrix();

        //Front base
        this.scene.pushMatrix();
        this.scene.translate(5.25,-5.25,5.25)
        this.scene.scale(10.5,10.5,10.5)
        this.scene.rotate(90 * deg2rad, 0, 1, 0);
        this.scene.setAmbient(1, 1, 1, 1);
        this.scene.setDiffuse(1, 1, 1, 1);
        this.quad.display();
        this.scene.popMatrix();

        //Down base
        this.scene.pushMatrix();
        this.scene.translate(5.25,-5.25,5.25)
        this.scene.scale(10.5,10.5,10.5)
        this.scene.rotate(90 * deg2rad, 0, 0, 1);
        this.scene.setAmbient(1, 1, 1, 1);
        this.scene.setDiffuse(1, 1, 1, 1);
        this.quad.display();
        this.scene.popMatrix();

        //Up base
        this.scene.pushMatrix();
        this.scene.translate(5.25,-5.25,5.25)
        this.scene.scale(10.5,10.5,10.5)
        this.scene.rotate(-90 * deg2rad, 0, 0, 1);
        this.scene.setAmbient(1, 1, 1, 1);
        this.scene.setDiffuse(1, 1, 1, 1);
        this.quad.display();
        this.scene.popMatrix();
    }
}
