import Sprite from "./Sprite";
import * as config from "../../config/Cell"

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

    //make a create child function to add a new child cell to the already created cell
}