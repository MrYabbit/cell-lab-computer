import React, {Component} from "react";
import {Renderer} from "../containers/Renderer";
import {CellGroup} from "../logic/group";
import * as config from "../../config";
import Cell from "../sprites/Cell";
import Graphics from "../graphics";

export class Simulation extends Component {
    constructor(props) {
        super(props);
        this.config = config;

        this.addCell = ((e) => {
            let rect = this.can.getBoundingClientRect();
            this.cells.add(new Cell(this.g, e.clientX - rect.left, e.clientY - rect.top, this.config.DEFAULT_CELL_ENERGY));
        }).bind(this);
    }

    componentDidMount() {
        this.cells = new CellGroup();
        this.can = document.getElementById("renderer-canvas");
        this.g = new Graphics(this.can);
        this.cells.add(new Cell(this.g, 100, 100, this.config.DEFAULT_CELL_ENERGY));


        setInterval(this.tick.bind(this), config.TPS);
    }

    tick() {
        this.g.clear();
        this.cells.starve(this.config.APT);
        this.cells.check_dead();
        this.cells.draw();
    }


    render() {
        return (<Renderer onClick={this.addCell}/>);
    }
}