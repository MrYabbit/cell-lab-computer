import Sprite from "./Sprite";
import Vector from "../utils/Vector";
import * as cell_config from "../../config/Cell";

export default class Cell extends Sprite {
    constructor(env, energy) {
        super(env);
        this.config = cell_config;
        this.energy = energy;
        if (this.energy < 0) this.energy = Infinity;
        this.movement = new Vector(0, 0);

        this.draw.body = this.draw.root.circle(this.radius)
                                        .center(this.x, this.y)
                                        .fill(this.config.COLOR_FILL)
                                        .stroke(this.config.COLOR_STROKE);
    }

    onMove() {
        this.draw.root.center(this.x, this.y)
    }

    get energy () {
        return this._energy;
    }

    set energy (val) {
        this._energy = Math.min(val, this.config.MAX_ENERGY);
    }

    get weight () {
        return this.energy/10;
    }

    get radius () {
        return Math.sqrt(this.energy);
    }

    push (vec) {
        this.movement = this.movement.add(vec.divide(this.weight));
        return this;
    }

    move (coef) {
        this.position = this.position.add(this.movement.multiply(coef));
        console.log(`moved to x:${this.x} y:${this.y}`);
        return this;
    }

    starve (coef) {
        this.energy -= coef*10;
        return this;
    }

    die () {
        this.energy = 0;
        return this;
    }

    dead () {
        return this.energy < this.config.MIN_ENERGY;
    }
}
