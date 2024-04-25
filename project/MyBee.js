import { CGFappearance, CGFobject, CGFtexture } from "../lib/CGF.js";
import { MyAnimatedBee } from "./MyAnimatedBee.js";
import { MyAnimatedWings } from "./MyAnimatedWings.js";
import { MyCilinder } from "./MyCilinder.js";
import { MyPetal } from "./MyPetal.js";
import { MySphere } from "./MySphere.js";
import { deg2rad, hexToRgbA } from "./utils.js";

export class MyBee extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;

        this.sphere = new MySphere(this.scene, this.slices, this.stacks, false, true);
        this.cilinder = new MyCilinder(this.scene, this.slices, this.stacks);
        this.wing = new MyPetal(this.scene, 50);

        this.bodyMaterial = new CGFappearance(this.scene);
        this.bodyMaterial.setAmbient(1, 1, 0, 0.0);
        this.bodyMaterial.setDiffuse(1, 1, 0, 0.0);
        this.bodyMaterial.setSpecular(1, 1, 0, 0.0);
        this.bodyMaterial.setTexture(new CGFtexture(this.scene, "images/bee.webp"));
        this.bodyMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.dark = new CGFappearance(this.scene);
        this.dark.setAmbient(0, 0, 0, 0.0);
        this.dark.setDiffuse(0, 0, 0, 0.0);
        this.dark.setSpecular(0, 0, 0, 0.0);

        this.head = new CGFappearance(this.scene);
        this.head.setAmbient(...hexToRgbA("#FAD369"));
        this.head.setDiffuse(...hexToRgbA("#FAD369"));
        this.head.setSpecular(...hexToRgbA("#FAD369"));

        this.wingsMaterial = new CGFappearance(this.scene);
        this.wingsMaterial.setAmbient(220/255, 220/255, 220/255, 0);
        this.wingsMaterial.setDiffuse(220/255, 220/255, 220/255, 0);
        this.wingsMaterial.setSpecular(220/255, 220/255, 220/255, 0);
        this.wingsMaterial.setEmission(220/255, 220/255, 220/255, 0.6);
        this.wingsMaterial.setTexture(new CGFtexture(this.scene, "images/wing.jpg"));
        this.wingsMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.beeAnimation = new MyAnimatedBee(this.scene);
        this.wingsAnimation = new MyAnimatedWings(this.scene, 50);

        // posição
        this.pos = {
            x: 0,
            y: 3,
            z: 0,
        };

        // angulo em torno do eixo yy
        this.orientation = 0;

        // vetor velocidade
        this.velocity = {
            x: 0,
            y: 0,
            z: 0,
        };

        this.initBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.pos.x, this.pos.y, this.pos.z);
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.displayHead();
        this.displayAbdomen();
        this.displayLegs();
        this.displayWings();
        this.scene.popMatrix();

        this.initGLBuffers();
    }

    displayHead() {
        this.scene.pushMatrix();
        this.scene.scale(0.3, 0.35, 0.3);
        this.head.apply();
        this.sphere.display();
        this.scene.popMatrix();

        this.displayEyes();
    }

    displayEyes() {
        for (let i = 0; i < 2; i++) {
            this.scene.pushMatrix();
            this.scene.translate(-0.25, 0.15, 0.1 - 0.2 * i);
            this.scene.scale(0.05, 0.07, 0.05);
            this.dark.apply();
            this.sphere.display();
            this.scene.popMatrix();
        }
    }

    displayAbdomen() {
        this.scene.pushMatrix();
        this.scene.translate(0.7, 0, 0);
        this.scene.scale(0.8, 0.35, 0.35);
        this.scene.rotate(deg2rad * 90, 0, 0, 1);
        this.bodyMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }

    displayLegs() {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                // pernas junto ao corpo
                this.scene.pushMatrix();
                this.scene.translate(0.5 + 0.5 * i, 0, 0.2 - 0.4 * j);
                this.scene.rotate(deg2rad * (105 - 210 * j), 1, 0, 0);
                this.scene.scale(0.03, 0.45, 0.03);
                this.dark.apply();
                this.cilinder.display();
                this.scene.popMatrix();

                // outras pernas
                this.scene.pushMatrix();
                this.scene.translate(0.5 + 0.5 * i, -0.09, 0.62 - 1.24 * j);
                this.scene.rotate(deg2rad * (170 - 340 * j), 1, 0, 0);
                this.scene.scale(0.03, 0.45, 0.03);
                this.dark.apply();
                this.cilinder.display();
                this.scene.popMatrix();
            }
        }
    }

    displayWings() {
        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);
        this.scene.gl.enable(this.scene.gl.BLEND);

        for (let i = 0; i < 2; i++) {
            this.scene.pushMatrix();

            this.scene.translate(0.4, 0.1, 0.2 - 0.4 * i);

            this.scene.rotate((-130 + 80 * i) * deg2rad, 0, 1, 0)

            // mete para baixo
            this.scene.rotate(70 * deg2rad, -1, 0, 0);

            this.scene.scale(0.4, 0.85, 0.4);
            this.scene.rotate(this.rotationAngle, 1, 0, 0);
            this.wingsMaterial.apply();
            this.wing.display();
            this.scene.popMatrix();
        }
    }

    turn(v) {
        this.orientation += v * deg2rad * this.scene.speedFactor;
    }
    
    accelerate(v) {
        this.velocity.x += Math.min(0.1, v * -Math.cos(this.orientation));
        this.velocity.z += Math.min(0.1, v * Math.sin(this.orientation));
    }

    reset() {
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.velocity.z = 0;
        this.pos.x = 0;
        this.pos.y = 3;
        this.pos.z = 0;
        this.orientation = 0;
    }

    update(timeSinceAppStart) {
        this.beeAnimation.update(timeSinceAppStart, this.velocity);
        this.wingsAnimation.update(timeSinceAppStart);
        this.pos.y = this.beeAnimation.getVal();
        this.rotationAngle = this.wingsAnimation.getVal();

        this.pos.x += this.velocity.x * this.scene.speedFactor;
        this.pos.y += this.velocity.y * this.scene.speedFactor;
        this.pos.z += this.velocity.z * this.scene.speedFactor;
    }
}