export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static by_coord(x, y) {
        return new Vector(x, y);
    }

    static by_len(angle, len) {
        return new Vector(Math.cos(angle)*len, Math.sin(angle)*len);
    }

    cp() {
        return new Vector(this.x, this.y);
    }

    get len() {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    get angle() {
        return Math.atan2(this.y, this.x);
    }

    set_len(val: Vector) {
        this.norm().multiply(val);
        return this;
    }

    add (vec: Vector) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }

    subtract (vec: Vector) {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }

    multiply (val: number) {
        this.x *= val;
        this.y *= val;
        return this;
    }

    divide (val: number) {
        this.x /= val;
        this.y /= val;
        return this;
    }

    norm () {
        this.divide(this.len);
        return this;
    }
}