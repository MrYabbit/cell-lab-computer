export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get len() {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    set len(val) {
        this.norm();
        this.multiply(val);
    }

    add (vec) {
        return new Vector(this.x + vec.x, this.y + vec.y);
    }

    substract (vec) {
        return new Vector(this.x - vec.x, this.y - vec.y);
    }

    multiply (val) {
        return new Vector(this.x * val, this.y * val);
    }

    divide (val) {
        return new Vector(this.x / val, this.y / val);
    }

    norm () {
        return this.divide(this.len);
    }
}