import { CGFappearance, CGFobject, CGFtexture } from "../lib/CGF.js";

export class MyHive extends CGFobject {
    constructor(scene, cube) {
        super(scene);
        this.cube = cube;

        this.hiveMaterial = new CGFappearance(this.scene);
        this.hiveMaterial.setAmbient(161/255, 102/255, 47/255, 1);
        this.hiveMaterial.setDiffuse(161/255, 102/255, 47/255, 1);
        this.hiveMaterial.setSpecular(161/255, 102/255, 47/255, 1);
        this.hiveMaterial.setTexture(new CGFtexture(this.scene, "images/hive.jpeg"));
        this.hiveMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.shadowMaterial = new CGFappearance(this.scene);
        this.shadowMaterial.setAmbient(0, 0, 0, 1);
        this.shadowMaterial.setDiffuse(0, 0, 0, 1);
        this.shadowMaterial.setSpecular(0, 0, 0, 1);
        this.shadowMaterial.setTexture(new CGFtexture(this.scene, "images/shadow.jpeg"));
        this.shadowMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.pollens = [];

        this.cube.setMaterial(this.hiveMaterial);

        this.pos = {
            x: 0,
            y: 60,
            z: 0,
        };

        this.initBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.drawLegs();
        this.drawBox();
        this.drawRoof();
        this.drawEntry();
        this.drawPollens();
        this.scene.translate(this.pos.x, this.pos.y, this.pos.z);
        this.scene.popMatrix();
    }

    drawEntry() {
        this.drawPlataform();
        this.drawBorders();
        this.drawShadow();
    }

    drawShadow() {
        this.cube.setMaterial(this.shadowMaterial);

        // entrada
        this.scene.pushMatrix();
        this.scene.translate(-0.69, 5.1, 5.5);
        this.scene.scale(0.59, 0.02, 0.01);
        this.cube.display();
        this.scene.popMatrix();        

        this.cube.setMaterial(this.hiveMaterial);
    }

    drawBorders() {
        // bordas das entradas
        for (let i = 0; i < 2; i++) {
            this.scene.pushMatrix();
            this.scene.translate(-0.7 + 6.1 * i, 5.1, 5.5);
            this.scene.scale(0.02, 0.05, 0.35);
            this.cube.display();
            this.scene.popMatrix();
        }
    }

    drawPlataform() {
        // plataforma entrada
        this.scene.pushMatrix();
        this.scene.translate(-0.69, 4.9, 5.5);
        this.scene.scale(0.59, 0.02, 0.3);
        this.cube.display();
        this.scene.popMatrix();
    }

    drawRoof() {
        // tampa de cima
        this.scene.pushMatrix();
        this.scene.translate(-1.3, 11.2, -1.3);
        this.scene.scale(0.7, 0.02, 0.7);
        this.cube.display();
        this.scene.popMatrix();
    }

    drawBox() {
        // caixa
        this.scene.pushMatrix();
        this.scene.translate(-0.7, 11, -0.7);
        this.scene.scale(0.6, 0.6, 0.6);
        this.cube.display();
        this.scene.popMatrix();
    }

    drawLegs() {
        // pernas
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                this.scene.pushMatrix();
                this.scene.translate(0 + 4 * i, 5, 0 + 4 * j);
                this.scene.scale(0.07, 0.5, 0.07);
                this.cube.display();
                this.scene.popMatrix();
            }
        }
    }

    drawPollens() {
        if (this.pollens.length === 0) return;

        for (let i = 0; i < this.pollens.length; i++) {
            this.scene.pushMatrix();
            const pollen = this.pollens[i];
            this.scene.translate(i % 6, 5.3, 6 + Math.floor(i / 6));
            pollen.display();
            this.scene.popMatrix();
        }
    }

    getPos() {
        return this.pos;
    }

    addPollen(pollen) {
        this.pollens.push(pollen);
    }
}