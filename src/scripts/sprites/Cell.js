import Sprite from "./Sprite";
import * as config from "../../config/Cell";
import * as global_config from "../../config";

export default class Cell extends Sprite {
    constructor(graphics, environment, x, y, energy) {
        super(graphics, x, y);
        this.energy = energy;
        this.config = config;
        this.entvironment = environment;
        this.direction = {
            x: 0,
            y: 0
        };
        if (this.energy < 0) this.energy = this.config.MAX_ENERGY;
    }

    get_radius() {
        return Math.sqrt(this.energy / Math.PI) * 10;
    }

    draw() {
        this.g.draw_circle(this.x, this.y, this.get_radius(), this.config.COLOR_FILL);
        this.g.draw_stroke_circle(this.x, this.y, this.get_radius(), this.config.COLOR_STROKE);
    }

    starve(coef) {
        this.energy -= coef * Math.pow(this.energy, 0.5);
    }

    died() {
        return this.energy < this.config.MIN_ENERGY;
    }

    move(coef) {
        this.x += this.direction.x*coef;
        this.y += this.direction.y*coef;
    }

    collide(obj, coef) {
        let new_direction = {
            x: this.x - obj.x,
            y: this.y - obj.y,
        };
        let len = Math.sqrt(Math.pow(new_direction.x, 2) + Math.pow(new_direction.y, 2));
        new_direction.x /= len;
        new_direction.y /= len;
        let overlap = obj.get_radius() + this.get_radius() - len;
        let push_force = {
            x: new_direction.x*overlap,
            y: new_direction.y*overlap
        };
        this.push(push_force);
        new_direction.x *= overlap / 10;
        new_direction.y *= overlap / 10;
        this.x += new_direction.x;
    }

    collide_with_edge(coef) {
        let new_direction = {
            x: this.entvironment.x - this.x,
            y: this.entvironment.y - this.y
        };
        let len = Math.sqrt(Math.pow(new_direction.x, 2) + Math.pow(new_direction.y, 2));
        if (len+this.get_radius() < this.entvironment.radius) return;
        new_direction.x /= len;
        new_direction.y /= len;
        let overlap = this.get_radius()+len - this.entvironment.radius;
        let push_force = {
            x: new_direction.x*overlap*4,
            y: new_direction.y*overlap*4
        };
        this.push(push_force);
        new_direction.x *= overlap/5;
        new_direction.y *= overlap/5;
        this.x += new_direction.x;
        this.y += new_direction.y;
    }

    push(direction) {
        this.direction.x += direction.x;
        this.direction.y += direction.y;
    }

    reproduce () {
        if (this.energy < this.config.REPRODUCE_ENERGY) return;
        this.entvironment.cells.add(new Cell(this.g, this.entvironment, this.x-1, this.y, this.energy/2));
        this.entvironment.cells.add(new Cell(this.g, this.entvironment, this.x+1, this.y, this.energy/2));
        this.energy = 0;
    }

    sunbath(coef) {
        let growth = Math.pow(this.y, 10)/Math.pow(310, 10);
        this.energy = Math.min(this.energy+Math.min(growth, this.config.MAX_GROWTH)*coef, this.config.MAX_ENERGY);
        console.log(this.energy);
    }

    get_speed () {
        return Math.sqrt(Math.pow(this.direction.x, 2) + Math.pow(this.direction.y, 2));
    }

    resistance(coef) {
        let resist_force = {
            x: -this.direction.x*this.get_speed()*this.entvironment.config.VISCOSITY*coef/10,
            y: -this.direction.y*this.get_speed()*this.entvironment.config.VISCOSITY*coef/10
        };
        this.push(resist_force);
    }
}