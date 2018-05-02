import Vector from "../utils/Vector";

export default class Sprite {
    constructor (env) {
        this.position = new Vector(0, 0);
        this.env = env;
        this.draw = {
            root: this.env.g.draw.group()
        }
    }

    get x() {
        return this.position.x;
    }

    set x(val) {
        this.position.x = val;
    }

    get y() {
        return this.position.y;
    }

    set y(val) {
        this.position.y = val;
    }

    destroy() {
        this.g.draw.remove(this.draw.root);
    }
}