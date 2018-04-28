import React, {Component} from "react";
import {Renderer} from "../containers/Renderer";
import {CellGroup, FoodGroup} from "../logic/groups";
import * as config from "../../config";
import Cell from "../sprites/Cell";
import Graphics from "../graphics";
import {Entvironment} from "../logic/Entvironment";

export class Simulation extends Component {
    constructor(props) {
        super(props);
        this.config = config;

        this.addCell = ((e) => {
            let rect = this.can.getBoundingClientRect();
            this.cells.add(new Cell(this.g, this.entvironment, e.clientX - rect.left, e.clientY - rect.top, this.config.DEFAULT_CELL_ENERGY));
        });
    }

    componentDidMount() {
        this.cells = new CellGroup();
        this.food = new FoodGroup();
        this.can = document.getElementById("renderer-canvas");
        this.g = new Graphics(this.can);
        this.entvironment = new Entvironment(this.g, this.cells, this.food, this.can.offsetWidth/2, this.can.offsetHeight/2, Math.min(this.can.offsetHeight-10, this.can.offsetWidth)/2);


        setInterval(this.tick.bind(this), config.TPS);
    }

    tick() {
        this.g.clear();
        this.entvironment.move(this.config.APT);
        this.entvironment.collide(this.config.APT);
        this.entvironment.starve(this.config.APT);
        this.entvironment.died();
        this.entvironment.draw();
    }


    render() {
        return (<Renderer onClick={this.addCell}/>);
    }
}