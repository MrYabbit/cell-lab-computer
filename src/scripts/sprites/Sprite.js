import Vector from "../utils/Vector";

export default class Sprite {
    constructor (env) {
        this._position = new Vector(0, 0);
        this.env = env;
        this.draw = {
            root: this.env.g.draw.group()
        }
    }

    get x() {
        return this._position.x;
    }

    set x(val) {
        this._position.x = val;
        this.onMove();
    }

    get y() {
        return this._position.y;
    }

    set y(val) {
        this._position.y = val;
        this.onMove();
    }

    get position () {
        return new Vector(this.x, this.y);
    }

    set position (val) {
        this.x = val.x;
        this.y = val.y;
    }

    destroy() {
        this.g.draw.remove(this.draw.root);
    }

    onMove() {
        return this;
    }
}