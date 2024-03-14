import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyTriangle } from './MyTriangle.js';
import { MyTriangleBig } from './MyTriangleBig.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';

/**
* MyInterface
* @constructor
*/
export class MyTangram extends CGFobject {

    constructor(scene) {
        super(scene);
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);

        this.purpletriangle = new MyTriangleSmall(scene, [
            0, 0,
            0.25, 0.25,
            0, 0.5,
            0, 0,
            0.25, 0.25,
            0, 0.5,
        ]);
        this.redtriangle = new MyTriangleSmall(scene, [
            0.25, 0.75,
            0.5, 0.5,
            0.75, 0.75,
            0.25, 0.75,
            0.5, 0.5,
            0.75, 0.75,
        ]);

        this.bluetriangle = new MyTriangleBig(scene, [
            0, 0,
			0.5, 0.5,
			1, 0,
            0, 0,
			0.5, 0.5,
			1, 0,
        ]);
        this.orangetriangle = new MyTriangleBig(scene, [
            1, 1,
            0.5, 0.5,
            1, 0,
            1, 1,
            0.5, 0.5,
            1, 0,
        ]);

        this.material = new CGFappearance(scene);
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.loadTexture('images/tangram.png');
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {

        const deg2rad=Math.PI/180.0;
        const a_rad=60.0*deg2rad;
        const cos_a = Math.cos(a_rad);
        const sin_a = Math.sin(a_rad);
    
        const diamondMatrix = [ cos_a, -sin_a, 0.0,  0.0,
                                sin_a, cos_a,  0.0,  0.0,
                                1.0,   0.0,    1.0,  0.0,
                                2.5,   2.6,    0.0,  1.0 ];
        
        // green square
        this.scene.pushMatrix();

        this.scene.multMatrix(diamondMatrix);
        this.material.apply();
        this.diamond.display();
        this.scene.popMatrix();
    
        // blue triangle
        this.scene.pushMatrix();
        this.scene.translate(2.0, 0.0, 0.0);
        this.material.apply();
        this.bluetriangle.display();
        this.scene.popMatrix();
    
        // yellow parallelogram
        this.scene.pushMatrix();
        this.scene.translate(5.5, 0.5, 0);
        this.scene.rotate(180 * deg2rad, 0, 1, 0);
        this.material.apply();
        this.parallelogram.display();
        this.scene.popMatrix();
    
        // pink triangle
        this.scene.pushMatrix();
        this.scene.rotate(45 * deg2rad, 0, 0, 1);
        this.scene.translate(1, 1, 0);
        this.material.apply();
        this.triangle.display();
        this.scene.popMatrix();
    
        // orange triangle
        this.scene.pushMatrix();
        this.scene.rotate(135 * deg2rad, 0, 0, 1);
        this.scene.translate(2, 0, 0);
        this.material.apply()
        this.orangetriangle.display();
        this.scene.popMatrix();
    
        // red triangle
        this.scene.pushMatrix();
        this.scene.translate(-3.8, 1, 0);
        this.material.apply()
        this.redtriangle.display();
        this.scene.popMatrix();
    
        // purple triangle
        this.scene.pushMatrix();
        this.scene.translate(-3, 3, 0);
        this.scene.rotate(-45 * deg2rad, 0, 0, 1);
        this.purpletriangle.display();
        this.scene.popMatrix();
    }
}
