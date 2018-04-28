import Sprite from "./Sprite";
import * as config from "../../config/Cell";
import * as global_config from "../../config";
import {Connection} from "./Connection";

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
        if (this.energy < this.config.MIN_ENERGY) {
            this.die();
        }
    }

    move(coef) {
        this.x += this.direction.x*coef;
        this.y += this.direction.y*coef;
    }

    connect(obj) { // connects this cell to another one
        this.connections.push(obj);
    }

    disconnect(obj) { //removes connection with obj cell
        for (let i = 0; i < this.connections.length; ++i) {
            if (this.connections[i].id === obj.id) {
                this.connections.splice(i--, 1);
            }
        }
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

    reproduce () { // creates 2 childs and reconnects all connections
        if (this.energy < this.config.REPRODUCE_ENERGY) return;
        let first = new Cell(this.g, this.entvironment, this.x-1, this.y+1, this.energy/2);
        let second = new Cell(this.g, this.entvironment, this.x+1, this.y-1, this.energy/2);
        this.entvironment.cells.add(first);
        this.entvironment.cells.add(second);
        let connection = new Connection(this.environment, first, second);
        this.entvironment.add_connection(connection);
        for (let i = 0; i < this.connections.length;) {
            let conn = this.connections[i];
            let other_obj = (conn.obj1.id === this.id)?conn.obj2:conn.obj1;
            let connection_first = new Connection(this.environment, other_obj, first);
            let connection_second = new Connection(this.environment, other_obj, second);
            this.environment.destroy_connection(this.connections[i]);
            this.entvironment.add_connection(connection_first);
            this.entvironment.add_connection(connection_second);
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
            this.entvironment.destroy_connection(obj);
        });
        this.entvironment.destroy_cell(this);
    }
}