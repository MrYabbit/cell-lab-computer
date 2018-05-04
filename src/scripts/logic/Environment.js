import * as environment_config from "../../config/Environment";
import * as config from "../../config";
import Cell from "../sprites/Cell";
import Vector from "../utils/Vector";
import Connection from "../sprites/Connection";


export default class Environment {
    constructor(graphics) {
        this.g = graphics;
        this.config = environment_config;
        this.cells = []; // here will be stored all existing cells
        this.connections = []; // here will be stored all existing connections
        this.g.draw.click((e) => { // this is event listener for clicking that will spawn new cells
            this.add_cell(new Cell(this, config.DEFAULT_CELL_ENERGY).move(new Vector(e.clientX, e.clientY)));
        })
    }

    add_cell(cell) { // this method is used to add new cells to environment
        this.cells.push(cell);
        return this;
    }

    connect(cell1, cell2) {
        let conn = new Connection(cell1, cell2);
        cell1.add_connection(conn);
        cell2.add_connection(conn);
        this.add_connection(conn);
    }

    add_connection(conn) { // this method adds new connection (you have to create object yourself or by calling method Environment.connect(cell1, cell2))
        this.connections.push(conn);
    }

    generate_movement(coef) {
        this.cells.forEach((obj)=>{
            obj.generate_movement(coef);
        });
        this.connections.forEach((obj)=>{
           obj.stretch(coef);
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
        });
        return this;
    }

    update_graphics() {
        this.cells.forEach((obj)=>{
            obj.update_graphics();
        });
        this.connections.forEach((obj)=>{
            obj.update_graphics();
        });
        return this;
    }

    starve (coef) {
        this.cells.forEach((obj)=>{
            obj.starve(coef);
        });
        return this;

    }

    check_dead() {
        for (let i = 0; i < this.cells.length; ++i) { // check cells
            let cell = this.cells[i];
            if (cell.dead()) {
                cell.destroy();
                this.cells.splice(i--, 1);
            }
        }

        for (let i = 0; i < this.connections.length; ++i) { // check connections
            if (this.connections[i].destroyed) {
                let conn = this.connections[i];
                conn.cell1.remove_connection(conn);
                conn.cell2.remove_connection(conn);
                conn.destroy();
                this.connections.splice(i--, 1);
            }
        }

        return this;
    }

    check_reproduction() {
        this.cells.forEach((obj) => {
            obj.check_reproduction();
        });
        return this;
    }
}