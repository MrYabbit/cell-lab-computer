import * as config from "../../config/Entvironment";

export class Entvironment {
    constructor (graphics, cells, food, x, y, radius) {
        this.config = config;
        this.g = graphics;
        this.cells = cells;
        this.food = food;
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    move (coef) {
        this.cells.move(coef);
    }

    eat () {
        this.cells.eat();
    }

    collide (coef) {
        this.cells.collide(coef);
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
        this.g.draw_stroke_circle(this.x, this.y, this.radius, this.g.colors.black);
    }

    sunbath(coef) {
        this.cells.sunbath(coef);
    }

    resistance(coef) {
        this.cells.resistance(coef);
    }
}