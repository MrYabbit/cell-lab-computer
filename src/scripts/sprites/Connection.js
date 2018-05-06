import * as config from "../../config";
import * as connedction_config from "../../config/Connection";
import Vector from "../utils/Vector";

export default class Connection {
    constructor(cell1, cell2) {
        this.cell1 = cell1;
        this.cell2 = cell2;
        this.angle = this.cell2.position.cp().subtract(this.cell1.position).angle;
        this.config = connedction_config;
        this.destroyed = false;
        this.draw = {
            root: this.cell1.env.g.draw.group().move(this.cell1.x, this.cell2.y),
        };

        this.draw.line = this.draw.root.line(0, 0, 0, 0).stroke({
            width: this.config.CONNECTION_WIDTH,
            color: this.config.CONNECTION_COLOR,
            linecap: "round"
        });
    }


    get vec() {
        return this.cell2.position.cp().subtract(this.cell1.position)
    }

    label_for_destruction() {
        this.destroyed = true;
    }

    destroy() { // this function should be called by Environment while collecting destroyed connection - for destroying connection use Connection.label_for_destruction method
        this.draw.root.remove();
    }

    stretch(coef) {
        let gap = this.vec.len - (this.cell1.radius + this.cell2.radius);
        if (gap >  this.config.CONNECTION_MAX_LEN_DIFFERENCE*(this.cell1.radius + this.cell2.radius)) {
            this.label_for_destruction();
        } else if (gap > 0) {
            let weight = this.cell1.weight + this.cell2.weight;
            this.cell1.push(this.vec.norm().multiply( Math.pow(gap, 1.5)).multiply(coef).multiply(20).multiply(weight));
            this.cell2.push(this.vec.norm().multiply(-Math.pow(gap, 1.5)).multiply(coef).multiply(20).multiply(weight));
        }
    }

    turn(coef) {
        let weight = this.cell1.weight + this.cell2.weight;
        let p = coef*5*weight;
        this.turn_1(p);
        this.turn_2(p);
    }

    turn_1(p) {
        let now = this.vec;
        let desired = Vector.by_len(this.angle+this.cell1.angle, now.len);
        let d_angle =  (now.angle - desired.angle+Math.PI*3)%(Math.PI*2)-Math.PI;
        //if (Math.abs(d_angle)>Math.PI/2) this.label_for_destruction();
        let force = desired.cp().subtract(now);
        if (Math.abs(d_angle) > 0.1) {
            force.multiply(p);
            this.cell2.push(force);
            this.cell1.spin(p * d_angle*5);
        }
    }

    turn_2(p) {
        let now = this.vec.multiply(-1);
        let desired = Vector.by_len(this.angle+this.cell1.angle, now.len).multiply(-1);
        let d_angle =  (now.angle - desired.angle+Math.PI*3)%(Math.PI*2)-Math.PI;
        //if (Math.abs(d_angle)>Math.PI/2) this.label_for_destruction();
        let force = desired.cp().subtract(now);
        if (Math.abs(d_angle) > 0.1) {
            force.multiply(p);
            this.cell1.push(force);
            this.cell2.spin(p * d_angle*5);
        }
    }


    update_graphics() {
        this.draw.root.move(this.cell1.x, this.cell1.y);
        let p_start = (this.cell1.radius)/(this.cell1.radius + this.cell2.radius);
        let p_end = 1-p_start;
        let start = this.vec.multiply((1-this.config.PART_VISIBLE)*p_start);
        let end = this.vec.multiply((1-this.config.PART_VISIBLE)*p_end);
        this.draw.line.plot(start.x, start.y, this.vec.x - end.x, this.vec.y - end.y);
    }
}