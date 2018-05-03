import Sprite from "./Sprite";
import Vector from "../utils/Vector";
import * as cell_config from "../../config/Cell";

export default class Cell extends Sprite {
    constructor(env, energy) {
        super(env);
        this.config = cell_config;
        this.energy = energy;
        if (this.energy < 0) this.energy = Infinity; // if energy is -1 than set it to maximum allowed energy (take a look at "set energy()")
        this.movement = new Vector(0, 0);


        // here is created graphics appearance of cell
        this.draw.body = this.draw.root.circle(this.radius)
                                        .center(this.x, this.y)
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
        return Math.sqrt(this.energy)*5;
    }

    push (vec) {
        this.movement = this.movement.add(vec.divide(this.weight));
        return this;
    }

    move (vec) {
        this.position = vec;
        return this;
    }

    dmove (vec) {
        this.move(this.position.add(vec));
        return this;
    }

    generate_movement (coef) {
        this.check_collisions_with_other_cells(coef);
    }

    check_collisions_with_other_cells (coef) {
        let cells = this.env.cells;
        let len = cells.length;
        for (let i = 0; i < len; ++i) { // iterate over all cells in environment
            let cell = cells[i];
            let diff = this.position.substract(cell.position); // compute vector from this to cell
            if (diff.len < cell.radius + this.radius && diff.len > 0) { // if it is close enough
                let overlap = cell.radius + this.radius - diff.len; // how much do cells overlap
                let move_instantly = diff.norm().multiply(overlap).divide( 2).multiply(coef); // this vector moves cell instantly - to solve spawning cells in middle of others
                let create_force   = diff.norm().multiply(overlap).divide(10).multiply(coef); // this vector represents the force that is caused by collision

                // now apply those two vectors
                this.dmove(move_instantly);
                this.push(create_force);
            }
        }

    }

    apply_movement (coef) {
        this.position = this.position.add(this.movement.multiply(coef));
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

    update_graphics() {
        // this updates svg
        this.draw.root.move(this.x, this.y);
    }
}
