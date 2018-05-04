import * as environment_config from "../../config/Environment";
import * as config from "../../config";
import Cell from "../sprites/Cell";
import Vector from "../utils/Vector";


export default class Environment {
    constructor(graphics) {
        this.g = graphics;
        this.config = environment_config;
        this.cells = []; // here will be stored all existing cells
        this.g.draw.click((e) => { // this is event listener for clicking that will spawn new cells
            this.add_cell(new Cell(this, config.DEFAULT_CELL_ENERGY).move(new Vector(e.clientX, e.clientY)));
        })
    }

    add_cell(cell) { // this method is used to add new cells to environment
        this.cells.push(cell);
    }

    generate_movement(coef) {
        this.cells.forEach((obj)=>{
            obj.generate_movement(coef);
        });
        return this;
    }

    apply_movement(coef) { // this method moves with everything in environment
        this.cells.forEach((obj)=>{
            obj.apply_movement(coef);
        });
        return this;
    }

    apply_friction(coef) { // this applies friction
        this.cells.forEach((obj) => {
            obj.apply_friction(coef);
        })
    }

    update_graphics() {
        this.cells.forEach((obj)=>{
            obj.update_graphics();
        });
        return this;
    }
}