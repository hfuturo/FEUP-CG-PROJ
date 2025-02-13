import { CGFappearance, CGFobject, CGFtexture } from "../lib/CGF.js";
import { MyAnimatedBee } from "./MyAnimatedBee.js";
import { MyAnimatedWings } from "./MyAnimatedWings.js";
import { deg2rad } from "./utils.js";

export class MyBee extends CGFobject {
    constructor(scene, slices, stacks, wing) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;

        this.sphere = this.scene.sphere;
        this.cilinder = this.scene.cilinder;
        this.wing = wing;

        this.bodyMaterial = new CGFappearance(this.scene);
        this.bodyMaterial.setAmbient(1, 1, 0, 0.0);
        this.bodyMaterial.setDiffuse(1, 1, 0, 0.0);
        this.bodyMaterial.setSpecular(1, 1, 0, 0.0);
        this.bodyMaterial.setTexture(new CGFtexture(this.scene, "images/bee.avif"));
        this.bodyMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.dark = new CGFappearance(this.scene);
        this.dark.setAmbient(0, 0, 0, 0.0);
        this.dark.setDiffuse(0, 0, 0, 0.0);
        this.dark.setSpecular(0, 0, 0, 0.0);

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
            y: 30,
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

        // se olha descer/subir para de fazer a animação
        this.stopAnim = false;
        this.collision = false;
        this.pollen = null;

        this.goingToHive = false;

        this.initBuffers();
    }

    getPos() {
        return this.pos;
    }

    getPollen() {
        return this.pollen;
    }

    removePollen() {
        this.pollen = null;
    }

    setCollision(collision) {
        this.collision = collision;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.pos.x, this.pos.y - 30, this.pos.z);
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.displayHead();
        this.displayTorax();
        this.displayAbdomen();
        this.displayLegs();
        this.displayWings();
        if (this.pollen != null)
            this.displayPollen();
        this.scene.popMatrix();

        this.initGLBuffers();
    }

    displayHead() {
        this.scene.pushMatrix();
        this.scene.rotate(deg2rad * -25, 0, 0, 1);
        this.scene.scale(0.3, 0.4, 0.3);
        this.bodyMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

        this.displayAntennas();
        this.displayEyes();
    }

    displayAntennas() {
        for (let i = 0; i < 2; i++) {
            // juntas ao corpo
            this.scene.pushMatrix();
            this.scene.translate(-0.1, 0.3, 0.05 - 0.1 * i);
            this.scene.rotate(deg2rad * 45, 0, 0, 1);
            this.scene.scale(0.01, 0.2, 0.01);
            this.dark.apply();
            this.cilinder.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(-0.23, 0.44, 0.05 - 0.1 * i);
            this.scene.rotate(deg2rad * 135, 0, 0, 1);
            this.scene.scale(0.01, 0.2, 0.01);
            this.dark.apply();
            this.cilinder.display();
            this.scene.popMatrix();
        }
    }

    displayEyes() {
        for (let i = 0; i < 2; i++) {
            this.scene.pushMatrix();
            this.scene.translate(-0.17, 0.15, 0.2 - 0.4 * i);
            this.scene.rotate(deg2rad * -25, 0, 0, 1);  // rotacao para ficar com angulo da cabeça
            this.scene.rotate(deg2rad * (30 - 60 * i), 0, 1, 0); // rotacao para "encaixar" na cabeça
            this.scene.scale(0.05, 0.2, 0.1);
            this.dark.apply();
            this.sphere.display();
            this.scene.popMatrix();
        }
    }

    displayTorax() {
        this.scene.pushMatrix();
        this.scene.translate(0.65, 0, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.scene.rotate(deg2rad * 90, 0, 0, 1);
        this.bodyMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }

    displayAbdomen() {
        this.scene.pushMatrix();
        this.scene.translate(1.55, -0.2, 0);
        this.scene.rotate(deg2rad * -20, 0, 0, 1);
        this.scene.rotate(deg2rad * 90, 0, 0, 1);
        this.scene.scale(0.35, 0.6, 0.35);
        this.bodyMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }

    displayLegs() {
        for (let i = 0; i < 2; i++) {
            // pernas da frente
            this.scene.pushMatrix();
            this.scene.translate(0.5, 0, 0.1 - 0.2 * i);
            this.scene.rotate(deg2rad * (-30 + 60 * i), 0, 1, 0);   // aponta para a frente
            this.scene.rotate(deg2rad * (150 - 300 * i), 1, 0, 0); // aponta para baixo
            this.scene.scale(0.03, 0.45, 0.03);
            this.dark.apply();
            this.cilinder.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0.401, -0.39, 0.27 - 0.54 * i);
            this.scene.rotate(deg2rad * (-30 + 60 * i), 0, 1, 0);   // aponta para a frente
            this.scene.rotate(deg2rad * (50 - 100 * i), 1, 0, 0);
            this.scene.scale(0.03, 0.15, 0.03);
            this.dark.apply();
            this.cilinder.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0.35, -0.3, 0.35 - 0.7 * i);
            this.scene.rotate(deg2rad * (-30 + 60 * i), 0, 1, 0);   // aponta para a frente
            this.scene.rotate(deg2rad * (150 - 300 * i), 1, 0, 0); // aponta para baixo
            this.scene.scale(0.03, 0.30, 0.03);
            this.dark.apply();
            this.cilinder.display();
            this.scene.popMatrix();

            // pernas do meio
            this.scene.pushMatrix();
            this.scene.translate(0.7, -0.1, 0.1 - 0.2 * i);
            this.scene.rotate(deg2rad * (-15 + 30 * i), 0, 1, 0);   // aponta para a frente
            this.scene.rotate(deg2rad * (150 - 300 * i), 1, 0, 0); // aponta para baixo
            this.scene.scale(0.03, 0.45, 0.03);
            this.dark.apply();
            this.cilinder.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0.651, -0.5, 0.3 - 0.6 * i);
            this.scene.rotate(deg2rad * (-15 + 30 * i), 0, 1, 0);   // aponta para a frente
            this.scene.rotate(deg2rad * (50 - 100 * i), 1, 0, 0);
            this.scene.scale(0.03, 0.15, 0.03);
            this.dark.apply();
            this.cilinder.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0.63, -0.40, 0.38 - 0.76 * i);
            this.scene.rotate(deg2rad * (-15 + 30 * i), 0, 1, 0);   // aponta para a frente
            this.scene.rotate(deg2rad * (150 - 300 * i), 1, 0, 0); // aponta para baixo
            this.scene.scale(0.03, 0.30, 0.03);
            this.dark.apply();
            this.cilinder.display();
            this.scene.popMatrix();

            // pernas de tras
            this.scene.pushMatrix();
            this.scene.translate(0.7, -0.1, 0.1 - 0.2 * i);
            this.scene.rotate(deg2rad * (15 - 30 * i), 0, 1, 0);   // aponta para a frente
            this.scene.rotate(deg2rad * (150 - 300 * i), 1, 0, 0); // aponta para baixo
            this.scene.scale(0.03, 0.45, 0.03);
            this.dark.apply();
            this.cilinder.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0.751, -0.5, 0.3 - 0.6 * i);
            this.scene.rotate(deg2rad * (15 - 30 * i), 0, 1, 0);   // aponta para a frente
            this.scene.rotate(deg2rad * (50 - 100 * i), 1, 0, 0);
            this.scene.scale(0.03, 0.15, 0.03);
            this.dark.apply();
            this.cilinder.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0.77, -0.40, 0.38 - 0.76 * i);
            this.scene.rotate(deg2rad * (15 - 30 * i), 0, 1, 0);   // aponta para a frente
            this.scene.rotate(deg2rad * (150 - 300 * i), 1, 0, 0); // aponta para baixo
            this.scene.scale(0.03, 0.30, 0.03);
            this.dark.apply();
            this.cilinder.display();
            this.scene.popMatrix();
        }
    }

    displayWings() {
        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);
        this.scene.gl.enable(this.scene.gl.BLEND);

        for (let i = 0; i < 2; i++) {
            let rotAngle = this.rotationAngle;
            if (i % 2 !== 0) 
                rotAngle *= -1;

            // asas da frente
            this.scene.pushMatrix();
            this.scene.translate(0.6, 0, -0.1 + 0.2 * i);
            this.scene.rotate(rotAngle, 1, 0, 0);
            this.scene.rotate(deg2rad * (170 - 340 * i), 0, 1, 0);
            this.scene.rotate(deg2rad * (70 - 140 * i), 1, 0, 0);
            this.scene.scale(0.3, 0.75, 0.3);
            this.scene.translate(0, 1, 0);
            this.wingsMaterial.apply();
            this.wing.display();
            this.scene.popMatrix();

            // asas de tras
            this.scene.pushMatrix();
            this.scene.translate(0.6, 0, -0.1 + 0.2 * i);
            this.scene.rotate(rotAngle, 1, 0, 0);
            this.scene.rotate(deg2rad * (140 - 280 * i), 0, 1, 0);
            this.scene.rotate(deg2rad * (70 - 140 * i), 1, 0, 0);
            this.scene.scale(0.3, 0.75, 0.3);
            this.scene.translate(0, 1, 0);
            this.wingsMaterial.apply();
            this.wing.display();
            this.scene.popMatrix();
        }
    }

    displayPollen() {
        this.scene.pushMatrix();
        this.scene.translate(0.5, -0.7, 0);
        this.bodyMaterial.apply();
        this.pollen.display();
        this.scene.popMatrix();
    }

    verticalAcceleration(y, pollen = null) {
        if (this.collision && y < 0) return;

        this.velocity.y += y * this.scene.speedFactor;

        if (y > 0) {
            this.collision = false;

            if (pollen != null) {
                this.pollen = pollen;
            }
        }
    }

    turn(v) {
        this.orientation += v * deg2rad * this.scene.speedFactor;

        const norm = Math.sqrt(this.velocity.x ** 2 + this.velocity.z ** 2);

        // atualiza vetor de velocidade para o movimento da abelha acompanhar a rotação
        this.velocity.x = Math.min(0.1, norm * -Math.cos(this.orientation));
        this.velocity.z = Math.min(0.1, norm * Math.sin(this.orientation));
    }
    
    accelerate(v) {
        // desacelera até parar
        if (v < 0) {
            if (this.velocity.x > 0) {
                this.velocity.x -= Math.max(0, v * Math.cos(this.orientation));
            }
            else {
                this.velocity.x += Math.max(0, -v * Math.cos(this.orientation));
            }

            if (this.velocity.z > 0) {
                this.velocity.z -= Math.max(0, -v * Math.sin(this.orientation));
            }
            else {
                this.velocity.z += Math.max(0, v * Math.sin(this.orientation));
            }
        }
        else {
            this.velocity.x += Math.min(0.1, v * -Math.cos(this.orientation));
            this.velocity.z += Math.min(0.1, v * Math.sin(this.orientation));
        }
    }

    goToHive(hivePos) {
        if (this.pollen == null) return;

        this.velocity.x = 0;
        this.velocity.y = 0;
        this.velocity.z = 0;

        const distanceX = hivePos.x - this.pos.x;
        const distanceY = hivePos.y - this.pos.y;
        const distanceZ = hivePos.z - this.pos.z;
        const distance = Math.sqrt(distanceX**2 + distanceY**2 + distanceZ**2);

        this.stopAnim = true;
        this.goingToHive = true;

        this.velocity.x += (distanceX / distance) / 10;
        this.velocity.y += (distanceY / distance) / 10;
        this.velocity.z += (distanceZ / distance) / 10;

        // abelha a pontar para colmeia
        this.orientation = Math.atan2((distanceZ / distance), -(distanceX / distance));
    }

    reset() {
        this.beeAnimation.setStartVal(30);
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.velocity.z = 0;
        this.pos.x = 0;
        this.pos.y = 30;
        this.pos.z = 0;
        this.orientation = 0;
        this.stopAnim = false;
        this.collision = false;
    }

    update(timeSinceAppStart) {
        this.wingsAnimation.update(timeSinceAppStart);

        if (!this.collision && !this.goingToHive && !this.stopAnim) {
            this.beeAnimation.update(timeSinceAppStart, this.scene.speedFactor);
            const yVal = this.beeAnimation.getVal();
            this.pos.y = yVal;
        }

        if (this.goingToHive) {
            this.beeAnimation.setStartVal(this.pos.y);
        }

        this.rotationAngle = this.wingsAnimation.getVal();

        
        if (!this.collision) {
            this.pos.x += this.velocity.x * this.scene.speedFactor;
            this.pos.y += this.velocity.y;
            this.pos.z += this.velocity.z * this.scene.speedFactor;
        } else {
            this.velocity.x = 0;
            this.velocity.z = 0;
        }

        this.stopAnim = false;
    }
}