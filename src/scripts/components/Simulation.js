import React, {Component} from "react";
import * as config from "../../config";
import Graphics from "../graphics";
import Sprite from "../sprites/Sprite";
import "../../styles/components/Simulation.css";
import Environment from "../logic/Environment";
import Vector from "../utils/Vector";

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
        this.sprite = new Sprite(this.env);
        this.sprite.draw.rect = this.sprite.draw.root.rect(50, 50).move(50, 50).fill(this.g.colors.green);
        this.sprite.draw.circle = this.sprite.draw.root.circle(100).fill(this.g.colors.red);
        setInterval(this.tick.bind(this), config.TPS);
    }

    tick() {
        this.sprite.draw.root.dmove(1, 1);
    }


    render() {
        return (<div id="renderer" onClick={this.addCell}/>);
    }
}