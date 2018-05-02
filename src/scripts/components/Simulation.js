import React, {Component} from "react";
import * as config from "../../config";
import Graphics from "../graphics";
import "../../styles/components/Simulation.css";

export class Simulation extends Component {
    constructor(props) {
        super(props);
        this.config = config;

        this.addCell = ((e) => {
        });

        this.draw = {};
    }

    componentDidMount() {
        this.g = new Graphics("renderer");
        this.draw.root = this.g.draw.group();
        this.draw.circle1 = this.draw.root.circle(100).fill("#F00").center(0, 0);
        this.draw.circle2 = this.draw.root.circle(50).fill("#0F0").center(0, 0);
        setInterval(this.tick.bind(this), config.TPS);
    }

    tick() {

    }


    render() {
        return (<div id="renderer" onClick={this.addCell}/>);
    }
}