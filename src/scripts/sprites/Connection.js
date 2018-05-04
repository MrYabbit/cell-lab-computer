import * as config from "../../config";
import * as connedction_config from "../../config/Connection";

export default class Connection {
    constructor(cell1, cell2) {
        this.cell1 = cell1;
        this.cell2 = cell2;
        this.config = connedction_config;
        this.destroyed = false;
        this.draw = {
            root: this.cell1.env.g.draw.group().move(this.cell1.x, this.cell2.y),
        };

        this.draw.line = this.draw.root.line(0, 0, 0, 0).stroke({
            width: this.config.CONNECTION_WIDTH,
            color: this.config.CONNECTION_COLOR,
        });
    }


    get vec() {
        return this.cell2.position.subtract(this.cell1.position)
    }

    label_for_destruction() {
        this.destroyed = true;
    }

    destroy() { // this function should be called by Environment while collecting destroyed connection - for destroying connection use Connection.label_for_destruction method
        this.draw.root.remove();
    }

    stretch(coef) {
        let gap = this.vec.len - (this.cell1.radius + this.cell2.radius)*0.9;
        if (gap >  this.config.CONNECTION_MAX_LEN_DIFFERENCE*(this.cell1.radius + this.cell2.radius)) {
            this.label_for_destruction();
        } else if (gap > 0) {
            let weight = this.cell1.weight + this.cell2.weight;
            this.cell1.push(this.vec.norm().multiply( gap).multiply(coef).multiply(1000).multiply(weight));
            this.cell2.push(this.vec.norm().multiply(-gap).multiply(coef).multiply(1000).multiply(weight));
        }
    }

    update_graphics() {
        this.draw.root.move(this.cell1.x, this.cell1.y);
        this.draw.line.plot(0, 0, this.cell2.position.subtract(this.cell1.position).x, this.cell2.position.subtract(this.cell1.position).y);
    }
}