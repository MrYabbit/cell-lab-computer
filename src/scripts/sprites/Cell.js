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
            x: 20,
            y: 20
        };
        if (this.energy < 0) this.energy = this.config.MAX_ENERGY;
    }

    get_radius() {
        return Math.sqrt(this.energy / Math.PI) * 10;
    }

    draw() {
        this.g.draw_circle(this.x, this.y, this.get_radius(), this.config.COLOR);
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
        //TODO: make a create child function to add a new child cell to the already created cell
    }
}