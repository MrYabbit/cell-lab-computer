import React, {Component} from "react";
import {CellGroup, FoodGroup, ConnectionGroup} from "../logic/groups";
import * as config from "../../config";
import Cell from "../sprites/Cell";
import Graphics from "../graphics";
import {Entvironment} from "../logic/Entvironment";
import "../../styles/components/Simulation.css";

export class Simulation extends Component {
    constructor(props) {
        super(props);
        this.config = config;

        this.addCell = ((e) => {
            let rect = this.parent.getBoundingClientRect();
            this.cells.add(new Cell(this.g, this.entvironment, e.clientX - rect.left, e.clientY - rect.top, this.config.DEFAULT_CELL_ENERGY));
        });
    }

    componentDidMount() {
        this.cells = new CellGroup();
        this.food = new FoodGroup();
        this.connections = new ConnectionGroup();
        this.parent = document.getElementById("renderer");
        this.g = new Graphics(this.parent);
        this.entvironment = new Entvironment(this.g, this.cells, this.food, this.connections, this.parent.offsetWidth/2, this.parent.offsetHeight/2, Math.min(this.parent.offsetHeight-10, this.parent.offsetWidth)/2);


        setInterval(this.tick.bind(this), config.TPS);
    }

    tick() {
        this.g.clear();
        this.entvironment.move(this.config.APT);
        this.entvironment.resistance(this.config.APT);
        this.entvironment.collide(this.config.APT);
        this.entvironment.sunbath(this.config.APT);
        this.entvironment.starve(this.config.APT);
        this.entvironment.reproduce();
        this.entvironment.died();
        this.entvironment.draw();
    }


    render() {
        return (<div id="renderer" onClick={this.addCell}/>);
    }
}