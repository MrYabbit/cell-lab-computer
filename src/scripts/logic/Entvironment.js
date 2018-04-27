import * as config from "../../config/Entvironment";

export class Entvironment {
    constructor (graphics, cells, food) {
        this.config = config;
        this.g = graphics;
        this.cells = cells;
        this.food = food;
    }

    move (coef) {
        this.cells.move(coef);
    }

    eat () {
        this.cells.eat();
    }

    collide (coef) {
        this.cells.collide();
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
    }
}