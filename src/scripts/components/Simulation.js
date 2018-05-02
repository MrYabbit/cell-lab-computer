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

        this.addCell = ((e) => {
        });
    }

    componentDidMount() {
        this.g = new Graphics("renderer");
        this.env = new Environment(this.g);
        this.env.add_cell(new Cell(this.env, this.config.DEFAULT_CELL_ENERGY).push(new Vector(1000, 1000)));
        setInterval(this.tick.bind(this), config.TPS);
    }

    tick() {
        this.env.move(1/this.config.TPS);
    }


    render() {
        return (<div id="renderer" onClick={this.addCell}/>);
    }
}