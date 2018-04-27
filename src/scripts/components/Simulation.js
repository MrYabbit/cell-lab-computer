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
    }

    componentDidMount() {
        this.cells = new CellGroup();
        this.g = new Graphics(document.getElementById("renderer-canvas"));
        this.cells.add(new Cell(this.g, 100, 100, 50));


        setInterval(this.tick.bind(this), config.TPS);
    }

    tick() {
        this.g.clear();
        this.cells.starve(this.config.APT);
        this.cells.check_dead();
        this.cells.draw();
    }


    render() {
        return (<Renderer/>);
    }
}