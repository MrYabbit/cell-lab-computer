import * as config from "../../config/Connection";

export class Connection { // represents connection between obj1 and obj2
    constructor(environment, obj1, obj2) {
        this.obj1 = obj1;
        this.obj2 = obj2;
        this.environment = environment;
        this.id = this.environment.get_id();
        this.config = config;
        this.time_over_limit = 0;
    }

    draw() {
        this.environment.g.draw_line(this.obj1.x, this.obj1.y, this.obj2.x, this.obj2.y, this.config.CONNECTION_COLOR, this.config.CONNECTION_WIDTH);
    }

    get_len() {
        return Math.sqrt(Math.pow(this.obj1.x-this.obj2.x, 2) + Math.pow(this.obj1.y-this.obj2.y, 2));
    }

    get_gap() {
        return this.get_len() - this.obj1.get_radius() - this.obj2.get_radius();
    }

    check_status () {
        let new_direction = {
            x: this.obj1.x - this.obj2.x,
            y: this.obj1.y - this.obj2.y,
        };
        let len = this.get_len();
        new_direction.x /= len;
        new_direction.y /= len;
        let gap = this.get_gap();
        if (gap>0) gap = Math.sqrt(Math.sqrt(gap));
        else gap = 0;

        let push_force = {
            x: new_direction.x*gap,
            y: new_direction.y*gap
        };
        this.obj2.push(push_force);
        push_force.x *= -1;
        push_force.y *= -1;
        this.obj1.push(push_force);
        new_direction.x *= gap/100;
        new_direction.y *= gap/100;
        this.obj2.x += new_direction.x;
        this.obj1.x -= new_direction.x;
        this.obj2.y += new_direction.y;
        this.obj1.y -= new_direction.y;

        if (this.get_gap()>this.config.CONNECTION_MAX_LEN_DIFFERENCE) {
            this.time_over_limit++;
            if (this.time_over_limit > this.config.RESISTANCE_TIME) {
                this.destroy();
            }
        } else {
            this.time_over_limit = 0;
        }
    }

    destroy () {
        this.obj1.disconnect(this);
        this.obj2.disconnect(this);
        this.environment.destroy_connection(this);
    }
}