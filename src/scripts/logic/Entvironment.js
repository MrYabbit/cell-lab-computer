import * as config from "../../config/Entvironment";

export class Entvironment {
    constructor (graphics, cells, food, connections, x, y, radius) {
        this.config = config;
        this.g = graphics;
        this.cells = cells;
        this.food = food;
        this.connections = connections;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.last_id = 0;
    }

    get_id() { // returns unique id
        return (++this.last_id);
    }

    move (coef) {
        this.cells.move(coef);
    }

    eat () {
        this.cells.eat();
    }

    collide (coef) {
        this.cells.collide(coef);
        this.connections.contract();
    }

    starve (coef) {
        this.cells.starve(coef);
    }

    reproduce () {
        this.cells.reproduce();
    }

    died () {
        this.cells.died();
    }

    draw () {
        this.food.draw();
        this.cells.draw();
        this.connections.draw();
        this.g.draw_stroke_circle(this.x, this.y, this.radius, this.g.colors.black);
    }

    sunbath(coef) {
        this.cells.sunbath(coef);
    }

    resistance(coef) {
        this.cells.resistance(coef);
    }

    destroy_connection(connection) {
        this.connections.destroy_connection(connection);
    }

    add_connection(conn) {
        this.connections.add(conn);
    }

    destroy_cell(cell) {
        this.cells.destroy_cell(cell);
    }
}