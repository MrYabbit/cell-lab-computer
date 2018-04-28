import Sprite from "./Sprite";
import * as config from "../../config/Cell";
import * as global_config from "../../config";

export default class Cell extends Sprite {
    constructor(graphics, environment, x, y, energy) {
        super(graphics, environment, x, y);
        this.energy = energy;
        this.config = config;
        this.entvironment = environment;
        this.connections = [];
        this.direction = {
            x: 0,
            y: 0
        };
        if (this.energy < 0) this.energy = this.config.MAX_ENERGY;
        console.log(this.id + " just born");
    }

    get_radius() {
        return Math.sqrt(this.energy / Math.PI) * 2;
    }

    draw() {
        this.g.draw_circle(this.x, this.y, this.get_radius(), this.config.COLOR_FILL);
        this.g.draw_stroke_circle(this.x, this.y, this.get_radius(), this.config.COLOR_STROKE);
        for (let i = 0; i < this.connections.length; ++i) {
            this.g.draw_line(this.x, this.y, this.connections[i].x, this.connections[i].y, this.config.CONNECTION_COLOR, this.config.CONNECTION_WIDTH);
        }
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

    connect(obj) { // connects this cell to another one
        this.connections.push(obj);
    }

    disconnect(id) { //removes connection with obj cell
        console.log(id);
        for (let i = 0; i < this.connections.length; ++i) {
            if (this.connections[i].id == id) {
                this.connections.splice(i, 1);
                --i;
                console.log("disconnected! left " + this.connections.length);
            }
        }
        console.log("left " + this.connections.length);
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

    follow_connected() {
        for (let i = 0; i < this.connections.length; ++i) {
            let obj = this.connections[i];
            let new_direction = {
                x: this.x - obj.x,
                y: this.y - obj.y,
            };
            let len = Math.sqrt(Math.pow(new_direction.x, 2) + Math.pow(new_direction.y, 2));
            new_direction.x /= len;
            new_direction.y /= len;
            let overlap = this.get_radius() + obj.get_radius() - len;
            let push_force = {
                x: new_direction.x*overlap/2,
                y: new_direction.y*overlap/2
            };
            this.push(push_force);
            new_direction.x *= overlap/30;
            new_direction.y *= overlap/30;
            this.x += new_direction.x;
        }
    }

    push(direction) {
        this.direction.x += direction.x;
        this.direction.y += direction.y;
    }

    reproduce () { // creates 2 childs and reconnects all connections
        if (this.energy < this.config.REPRODUCE_ENERGY) return;
        let first = new Cell(this.g, this.entvironment, this.x-1, this.y+1, this.energy/2);
        let second = new Cell(this.g, this.entvironment, this.x+1, this.y-1, this.energy/2);
        first.connect(second);
        second.connect(first);
        this.entvironment.cells.add(first);
        this.entvironment.cells.add(second);
        for (let i = 0; i < this.connections.length; ++i) {
            this.connections[i].connect(first);
            this.connections[i].connect(second);
            first.connect(this.connections[i]);
            second.connect(this.connections[i]);
        }
        this.die()
    }

    sunbath(coef) {
        let growth = Math.pow(this.y, 10)/Math.pow(this.g.canvas.height*0.7, 10);
        this.energy = Math.min(this.energy+Math.min(growth, this.config.MAX_GROWTH)*coef, this.config.MAX_ENERGY);
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

    die() {
        console.log(this.id + " just died");
        this.energy = 0;
        this.connections.forEach((obj) => {
            obj.disconnect(this.id);
        })
    }
}