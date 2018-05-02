import Sprite from "./Sprite";
import Vector from "../utils/Vector";
import * as cell_config from "../../config/Cell";

export default class Cell extends Sprite {
    constructor(env, energy) {
        super(env);
        this.config = cell_config;
        this.energy = energy;
        this.movement = Vector(0, 0);

        this.draw.body = this.draw.root.circle(this.radius)
                                        .center(this.position.x, this.position.y)
                                        .fill(this.config.COLOR_FILL)
                                        .stroke(this.config.COLOR_STROKE);
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
    }

    move (coef) {
        this.position = this.position.add(this.movement.multiply(coef));
    }

    starve (coef) {
        this.energy -= coef*10;
    }

    die () {
        this.energy = 0;
    }

    dead () {
        return this.energy < this.config.MIN_ENERGY;
    }
}
