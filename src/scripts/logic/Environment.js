import * as environment_config from "../../config/Entvironment";
import * as config from "../../config";


export default class Environment {
    constructor(graphics) {
        this.g = graphics;
        this.config = environment_config;
        this.cells = []; // here will be stored all existing cells
    }

    add_cell(cell) {
        this.cells.push(cell);
    }
}