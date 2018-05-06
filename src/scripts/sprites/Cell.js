import Vector from "../utils/Vector";
import * as cell_config from "../../config/Cell";

export default class Cell {
    constructor(env, energy) {
        this._position = new Vector(0, 0);
        this.angle = 0;
        this.env = env;
        this.draw = {
            root: this.env.g.draw.group()
        };
        this.config = cell_config;
        this.energy = energy;
        if (this.energy < 0) this.energy = Infinity; // if energy is -1 than set it to maximum allowed energy (take a look at "set energy()")
        this.movement = new Vector(0, 0);
        this.rotation = 0;
        this.connections = [];


        // here is created graphics appearance of cell
        this.draw.body = this.draw.root.circle(0)
            .center(this.x, this.y)
            .fill(this.config.COLOR_FILL)
            .stroke(this.config.COLOR_STROKE)
            .radius(this.radius);
        this.draw.angle = this.draw.root.line(0, 0, Vector.by_len(this.angle, this.radius*0.75).x, Vector.by_len(this.angle, this.radius*0.75).y).stroke({color: "#00F", width:2});

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
        return Math.sqrt(this.energy)*2;
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
        this.movement.add(vec.cp().divide(this.weight));
        return this;
    }

    spin(angle) {
        this.rotation += angle/this.weight;
    }

    move (vec) {
        this.position = vec.cp();
        return this;
    }

    dmove (vec) {
        this.position.add(vec);
        return this;
    }

    generate_movement (coef) {
        this.check_collisions_with_other_cells(coef);
        this.check_environment_border(coef);
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
            let diff = this.position.cp().subtract(cell.position); // compute vector from this to cell
            if (diff.len < cell.radius + this.radius && diff.len > 0) { // if it is close enough
                let overlap = cell.radius + this.radius - diff.len; // how much do cells overlap

                overlap = Math.sqrt(Math.sqrt(overlap+1))-1; // using square root of overlap for more smooth behavior after spawning cell on another

                let move_instantly = diff.cp().norm().multiply(overlap).multiply(20).multiply(coef).multiply(this.weight+cell.weight); // this vector moves cell instantly - to solve spawning cells in middle of others
                let create_force   = diff.cp().norm().multiply(overlap).multiply(1000).multiply(coef).multiply(this.weight+cell.weight); // this vector represents the force that is caused by collision

                // now apply those two vectors
                this.dmove(move_instantly);
                this.push(create_force);
                // ... to both colliding cells
                cell.dmove(move_instantly.multiply(-1));
                cell.push(create_force.multiply(-1));
            }
        }
    }

    check_environment_border(coef) {
        let vec = this.env.center.cp().subtract(this.position);
        let overlap = this.radius + vec.len - this.env.radius;
        if (overlap > 0) {
            vec.norm().multiply(overlap).multiply(coef).multiply(10000);
            this.push(vec);
        }
    }

    apply_friction (coef) {// applies friction
        let friction = this.movement.len*this.movement.len * this.radius * this.env.config.VISCOSITY * coef;
        if (friction) {
            this.push(this.movement.cp().set_len(-Math.min(friction, this.movement.len)));
        }

        let rotation_friction = this.rotation * this.env.config.VISCOSITY * coef*1000;
        if (rotation_friction) {
            if (Math.abs(rotation_friction) > this.rotation) {
                this.rotation = 0;
            } else {
                this.spin(-rotation_friction);
            }
        }
    }

    apply_movement (coef) {
        this.position.add(this.movement.cp().multiply(coef));
        this.angle += this.rotation*coef;
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
        this.draw.root.move(this._position.x, this._position.y);
        this.draw.body.radius(this.radius);
        this.draw.angle.plot(0, 0, Vector.by_len(this.angle, this.radius*0.75).x, Vector.by_len(this.angle, this.radius*0.75).y);
    }

    check_reproduction() {
        if (this.energy > this.config.REPRODUCE_ENERGY) {
            let child1 = new Cell(this.env, this.energy/2).move(this.position.add({x:1, y:0}));
            let child2 = new Cell(this.env, this.energy/2).move(this.position.subtract({x:1, y:0}));

            child1.angle = this.angle;
            child2.angle = this.angle;

            this.env.add_cell(child1);
            this.env.add_cell(child2);

            this.env.connect(child1, child2); // connects childs together
            let cells_to_connect = [];
            for(let i = 0; i < this.connections.length; ++i) {
                if (this.connections[i].cell1 === this) {
                    cells_to_connect.push(this.connections[i].cell2);
                } else {
                    cells_to_connect.push(this.connections[i].cell1);
                }
            }
            cells_to_connect.forEach((cell) => {
                this.env.connect(cell, child1);
                this.env.connect(cell, child2);
            });

            this.die();
        }
    }

    sunbath(coef) {
        let light = this.position.y - this.env.g.parent.offsetHeight*0.8;
        if (light > 0) {
            light /= this.env.g.parent.offsetHeight*0.2;
            light *= this.config.MAX_GROWTH;
            this.energy += Math.min(light, this.config.MAX_GROWTH)*coef;
        }
    }
}
