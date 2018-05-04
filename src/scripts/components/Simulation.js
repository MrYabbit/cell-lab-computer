import React, {Component} from "react";
import * as config from "../../config";
import Graphics from "../graphics";
import Sprite from "../sprites/Sprite";
import "../../styles/components/Simulation.css";
import Environment from "../logic/Environment";
import Vector from "../utils/Vector";
import Cell from "../sprites/Cell";

export class Simulation extends Component {
    constructor(props) {
        super(props);
        this.config = config;
    }

    componentDidMount() {
        this.g = new Graphics("renderer"); // Creates new svg graphics in #renderer
        this.env = new Environment(this.g); // Initializes Environment
        this.env.add_cell(new Cell(this.env, this.config.DEFAULT_CELL_ENERGY).push(new Vector(1000, 1000))); // Adds test Cell into Environment
        setInterval(this.tick.bind(this), 1000/config.TPS); // Calls tick() TPS times each second;
    }

    tick() {
        this.env.generate_movement(1/this.config.TPS); // check physics and generates movement
        this.env.apply_movement(1/this.config.TPS); // moves everything in Environment
        this.env.apply_friction(1/this.config.TPS); // applies friction of environment
        this.env.update_graphics(); // this updates shown svg
    }


    render() {
        return (<div id="renderer" onClick={this.addCell}/>);
    }
}