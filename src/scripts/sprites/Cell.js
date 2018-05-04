import Vector from "../utils/Vector";
import * as cell_config from "../../config/Cell";

export default class Cell {
    constructor(env, energy) {
        this._position = new Vector(0, 0);
        this.env = env;
        this.draw = {
            root: this.env.g.draw.group()
        };
        this.config = cell_config;
        this.energy = energy;
        if (this.energy < 0) this.energy = Infinity; // if energy is -1 than set it to maximum allowed energy (take a look at "set energy()")
        this.movement = new Vector(0, 0);
        this.connections = [];


        // here is created graphics appearance of cell
        this.draw.body = this.draw.root.circle(0)
                                        .center(this.x, this.y)
                                        .fill(this.config.COLOR_FILL)
                                        .stroke(this.config.COLOR_STROKE)
                                        .radius(this.radius);
    }

    get x() {
        return this._position.x;
    }

    set x(val) {
        this._position.x = val;
    }

    get y() {
        return this._position.y;
    }

    set y(val) {
        this._position.y = val;
    }

    get position () {
        return this._position;
    }

    set position (val) {
        this.x = val.x;
        this.y = val.y;
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

    add_connection (conn) {
        this.connections.push(conn);
    }

    remove_connection (conn) {
        for (let i = 0; i < this.connections.length; ++i) {
            if (this.connections[i] === conn) {
                this.connections.splice(i--, 1);
            }
        }
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
        let found_itself = false;
        for (let i = 0; i < len; ++i) { // iterate over all cells in environment
            if (!found_itself) {
                found_itself = this === cells[i];
                continue;
            }
            let cell = cells[i];
            let diff = this.position.subtract(cell.position); // compute vector from this to cell
            if (diff.len < cell.radius + this.radius && diff.len > 0) { // if it is close enough
                let overlap = cell.radius + this.radius - diff.len; // how much do cells overlap

                if (overlap > 1) // only if overlap is higher than 1 - than messes up scalability but square root increases little overlaps that causes "vibrating"
                    overlap = Math.sqrt(overlap); // using square root of overlap for more smooth behavior after spawning cell on another

                let move_instantly = diff.norm().multiply(overlap).multiply(5).multiply(coef).multiply(this.weight+cell.weight); // this vector moves cell instantly - to solve spawning cells in middle of others
                let create_force   = diff.norm().multiply(overlap).multiply(1000).multiply(coef).multiply(this.weight+cell.weight); // this vector represents the force that is caused by collision

                // now apply those two vectors
                this.dmove(move_instantly);
                this.push(create_force);
                // ... to both colliding cells
                cell.dmove(move_instantly.multiply(-1));
                cell.push(create_force.multiply(-1));
            }
        }

    }

    apply_friction (coef) {// applies friction
        let friction = this.movement.len*this.movement.len * this.radius * this.env.config.VISCOSITY * coef;
        if (friction) {
            this.push(this.movement.set_len(-Math.min(friction, this.movement.len)));
        }
    }

    apply_movement (coef) {
        this.position = this.position.add(this.movement.multiply(coef));
        return this;
    }

    starve (coef) {
        this.energy -= coef*this.config.STARVE_RATE*Math.sqrt(this.energy/100);
        return this;
    }

    die () {
        this.energy = 0;
        return this;
    }

    dead () {
        return this.energy < this.config.MIN_ENERGY;
    }

    destroy() { // this method should be called just from Environment.check_dead - for killing cell use this.die
        this.draw.root.remove();
        for (let i = 0; i < this.connections.length; ++i) {
            this.connections[i].label_for_destruction();
        }
    }

    update_graphics() {
        // this updates svg
        this.draw.root.move(this.x, this.y);
        this.draw.body.radius(this.radius);
    }

    check_reproduction() {
        if (this.energy > this.config.REPRODUCE_ENERGY) {
            let child1 = new Cell(this.env, this.energy/2).move(this.position.add({x:1, y:1}));
            let child2 = new Cell(this.env, this.energy/2).move(this.position.subtract({x:1, y:1}));

            this.env.add_cell(child1);
            this.env.add_cell(child2);

            this.env.connect(child1, child2); // connects childs together

            this.die();
        }
    }
}
