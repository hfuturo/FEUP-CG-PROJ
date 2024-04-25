import { MyBee } from "./MyBee.js";

export class MyAnimatedBee {
    constructor(scene, s=3, e=4, st=0, d=0.5) {
        this.scene = scene;

        this.startVal = s;
        this.endVal = e;
        this.animStartTimeSecs = st;
        this.animDurationSecs = d;
        this.length = (this.endVal - this.startVal);

        this.moveUp = true;
        
        this.animVal = this.startVal;

        this.lastElapsedTime = 0;
    }

    easeInOutQuad(x) {
        return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }

    update(timeSinceAppStart, velocity) {
        const elapsedTimeSecs = (timeSinceAppStart - this.animStartTimeSecs) % this.animDurationSecs;

        // se elapsed time atual for menor que anterior, significa que animação recomeçou e é necessário mudar direção do movimento
        if (elapsedTimeSecs < this.lastElapsedTime) {
            this.moveUp = !this.moveUp;
        }

        this.lastElapsedTime = elapsedTimeSecs;

        if (elapsedTimeSecs >= 0 && elapsedTimeSecs <= this.animDurationSecs) {
            if (this.moveUp) {
                this.animVal = (this.startVal - this.length) + (this.easeInOutQuad(elapsedTimeSecs / this.animDurationSecs) * this.length) * 2;
            }
            else {
                this.animVal = ((this.startVal + this.length) - (this.easeInOutQuad(elapsedTimeSecs / this.animDurationSecs) * this.length) * 2);
            }
        }
    }

    getVal() {
        return this.animVal;
    }
}