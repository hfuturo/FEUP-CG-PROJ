import { CGFobject } from '../lib/CGF.js';
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
        this.trianglesmall = new MyTriangleSmall(scene);
        this.trianglebig = new MyTriangleBig(scene);
        this.initBuffers();
    }

    display() {

        const deg2rad=Math.PI/180.0;
        const a_rad=60.0*deg2rad;
        const cos_a = Math.cos(a_rad);
        const sin_a = Math.sin(a_rad);
    
        const diamondMatrix = [ cos_a, -sin_a, 0.0,  0.0,
                                sin_a, cos_a,  0.0,  0.0,
                                0.0,   0.0,    1.0,  0.0,
                                2.5,   2.6,    0.0,  1.0 ];
        
        // green square
        this.scene.pushMatrix();
        // this.scene.setAmbient(0, 0.5, 0, 1);
        // this.scene.setDiffuse(0, 0.5, 0, 1);
        // this.scene.setSpecular(0, 1, 0, 1);
        this.scene.updateCustomMaterial();
        this.scene.multMatrix(diamondMatrix)
        this.diamond.display();
        this.scene.popMatrix();
    
        // blue triangle
        this.scene.pushMatrix();
        this.scene.translate(2.0, 0.0, 0.0);
        this.scene.setAmbient(0, 0, 0.5, 1);
        this.scene.setDiffuse(0, 0, 0.5, 1);
        this.scene.setSpecular(0, 0, 1, 1);
        this.trianglebig.display();
        this.scene.popMatrix();
    
        // yellow parallelogram
        this.scene.pushMatrix();
        this.scene.translate(5.5, 0.5, 0);
        this.scene.rotate(180 * deg2rad, 0, 1, 0);
        this.scene.setAmbient(0.5, 0.5, 0, 1);
        this.scene.setDiffuse(0.5, 0.5, 0, 1);
        this.scene.setSpecular(1, 1, 0, 1);
        this.parallelogram.display();
        this.scene.popMatrix();
    
        // pink triangle
        this.scene.pushMatrix();
        this.scene.rotate(45 * deg2rad, 0, 0, 1);
        this.scene.translate(1, 1, 0);
        this.scene.setAmbient(0.5, 0.30, 0.35, 1);
        this.scene.setDiffuse(0.5, 0.30, 0.35, 1);
        this.scene.setSpecular(1, 0.60, 0.70, 1);
        this.triangle.display();
        this.scene.popMatrix();
    
        // orange triangle
        this.scene.pushMatrix();
        this.scene.rotate(135 * deg2rad, 0, 0, 1);
        this.scene.translate(2, 0, 0);
        this.scene.setAmbient(0.5, 165/255*0.5, 0, 1);
        this.scene.setDiffuse(0.5, 165/255*0.5, 0, 1);
        this.scene.setSpecular(1, 165/255, 0, 1);
        this.trianglebig.display();
        this.scene.popMatrix();
    
        // red triangle
        this.scene.pushMatrix();
        this.scene.setAmbient(0.5, 0, 0, 1);
        this.scene.setDiffuse(0.5, 0, 0, 1);
        this.scene.setSpecular(1, 0, 0, 1);
        this.scene.translate(-3.8, 1, 0);
        this.trianglesmall.display();
        this.scene.popMatrix();
    
        // purple triangle
        this.scene.pushMatrix();
        this.scene.translate(-3, 3, 0);
        this.scene.rotate(-45 * deg2rad, 0, 0, 1);
        this.scene.setAmbient(160 / 255 * 0.5, 32 / 255 * 0.5, 240 / 255 * 0.5, 1);
        this.scene.setDiffuse(160 / 255 * 0.5, 32 / 255 * 0.5, 240 / 255 * 0.5, 1);
        this.scene.setSpecular(160 / 255, 32 / 255, 240 / 255, 1);
        this.trianglesmall.display();
        this.scene.popMatrix();

        this.initGLBuffers();
    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.trianglesmall.enableNormalViz();
        this.trianglebig.enableNormalViz();

    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.triangle.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.trianglesmall.disableNormalViz();
        this.trianglebig.disableNormalViz();
    }

    updateBuffers(complexity){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
