import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';


/**
* MyInterface
* @constructor
*/
export class MyUnitCubeQuad extends CGFobject {

    constructor(scene,texture1,texture2,texture3,texture4,texture5,texture6) {
        super(scene);
        this.quad = new MyQuad(scene)
        
        this.materialUp = new CGFappearance(scene);
        this.materialUp.setAmbient(1, 1, 1, 1);
        this.materialUp.setDiffuse(0.9, 0.9, 0.9, 1);
        this.materialUp.setSpecular(0.9, 0.9, 0.9, 1);
        this.materialUp.setShininess(10.0);
        this.materialUp.loadTexture(texture1);
        this.materialUp.setTextureWrap('REPEAT', 'REPEAT');

        this.materialFront = new CGFappearance(scene);
        this.materialFront.setAmbient(1, 1, 1, 1);
        this.materialFront.setDiffuse(0.9, 0.9, 0.9, 1);
        this.materialFront.setSpecular(0.9, 0.9, 0.9, 1);
        this.materialFront.setShininess(10.0);
        this.materialFront.loadTexture(texture2);
        this.materialFront.setTextureWrap('REPEAT', 'REPEAT');

        this.materialRight = new CGFappearance(scene);
        this.materialRight.setAmbient(1, 1, 1, 1);
        this.materialRight.setDiffuse(0.9, 0.9, 0.9, 1);
        this.materialRight.setSpecular(0.9, 0.9, 0.9, 1);
        this.materialRight.setShininess(10.0);
        this.materialRight.loadTexture(texture3);
        this.materialRight.setTextureWrap('REPEAT', 'REPEAT');
        
        this.materialBack = new CGFappearance(scene);
        this.materialBack.setAmbient(1, 1, 1, 1);
        this.materialBack.setDiffuse(0.9, 0.9, 0.9, 1);
        this.materialBack.setSpecular(0.9, 0.9, 0.9, 1);
        this.materialBack.setShininess(10.0);
        this.materialBack.loadTexture(texture4);
        this.materialBack.setTextureWrap('REPEAT', 'REPEAT');

        this.materialLeft = new CGFappearance(scene);
        this.materialLeft.setAmbient(1, 1, 1, 1);
        this.materialLeft.setDiffuse(0.9, 0.9, 0.9, 1);
        this.materialLeft.setSpecular(0.9, 0.9, 0.9, 1);
        this.materialLeft.setShininess(10.0);
        this.materialLeft.loadTexture(texture5);
        this.materialLeft.setTextureWrap('REPEAT', 'REPEAT');

        this.materialDown = new CGFappearance(scene);
        this.materialDown.setAmbient(1, 1, 1, 1);
        this.materialDown.setDiffuse(0.9, 0.9, 0.9, 1);
        this.materialDown.setSpecular(0.9, 0.9, 0.9, 1);
        this.materialDown.setShininess(10.0);
        this.materialDown.loadTexture(texture6);
        this.materialDown.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(gl) {

        const deg2rad=Math.PI/180.0;
        
        //Left base
        this.scene.pushMatrix();
        this.scene.translate(5.25,-5.25,5.25)
        this.scene.scale(10.5,10.5,10.5)
        this.materialLeft.apply();
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        this.quad.updateTexCoords(
            [0,1,
            1,1,
            0,0,
            1,0]);
        this.quad.display();
        this.scene.popMatrix();
        
        //Back base
        this.scene.pushMatrix();
        this.scene.translate(5.25,-5.25,5.25)
        this.scene.scale(10.5,10.5,10.5)
        this.scene.rotate(-90 * deg2rad, 0, 1, 0);
        this.materialBack.apply();
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //Right base
        this.scene.pushMatrix();
        this.scene.translate(5.25,-5.25,5.25)
        this.scene.scale(10.5,10.5,10.5)
        this.scene.rotate(180 * deg2rad, 0, 1, 0);
        this.materialRight.apply();
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //Front base
        this.scene.pushMatrix();
        this.scene.translate(5.25,-5.25,5.25)
        this.scene.scale(10.5,10.5,10.5)
        this.scene.rotate(90 * deg2rad, 0, 1, 0);
        this.materialFront.apply();
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //Down base
        this.scene.pushMatrix();
        this.scene.translate(5.25,-5.25,5.25)
        this.scene.scale(10.5,10.5,10.5)
        this.scene.rotate(90 * deg2rad, 0, 0, 1);
        this.materialDown.apply();
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //Up base
        this.scene.pushMatrix();
        this.scene.translate(5.25,-5.25,5.25)
        this.scene.scale(10.5,10.5,10.5)
        this.scene.rotate(-90 * deg2rad, 0, 0, 1);
        this.materialUp.apply();
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
    }
}
