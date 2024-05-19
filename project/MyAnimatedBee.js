export class MyAnimatedBee {
    constructor(scene, s=30, e=31, st=0, d=0.5) {
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

    update(timeSinceAppStart, speedFactor) {
        const animDuration = this.animDurationSecs * 1 / speedFactor;

        const elapsedTimeSecs = (timeSinceAppStart - this.animStartTimeSecs) % animDuration;

        // se elapsed time atual for menor que anterior, significa que animação recomeçou e é necessário mudar direção do movimento
        if (elapsedTimeSecs < this.lastElapsedTime) {
            this.moveUp = !this.moveUp;
        }

        this.lastElapsedTime = elapsedTimeSecs;

        if (elapsedTimeSecs >= 0 && elapsedTimeSecs <= animDuration) {
            if (this.moveUp) {
                this.animVal = (this.startVal - this.length) + (this.easeInOutQuad(elapsedTimeSecs / animDuration) * this.length) * 2;
            }
            else {
                this.animVal = ((this.startVal + this.length) - (this.easeInOutQuad(elapsedTimeSecs / animDuration) * this.length) * 2);
            }
        }
    }

    getVal() {
        return this.animVal;
    }

    setStartVal(startVal) {
        this.startVal = startVal;
        this.endVal = startVal + 1;
        this.length = this.startVal - this.endVal;
        this.animVal = this.startVal;
    }
}