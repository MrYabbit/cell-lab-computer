import React, {Component} from "react";
import * as config from "../../config";
import Graphics from "../graphics";
import "../../styles/components/Simulation.css";
import Environment from "../logic/Environment";
import Vector from "../utils/Vector";

export class Simulation extends Component {
    constructor(props) {
        super(props);
        this.config = config;
    }

    componentDidMount() {
        this.g = new Graphics("renderer"); // Creates new svg graphics in #renderer
        this.env = new Environment(this.g); // Initializes Environment
        setInterval(this.tick.bind(this), 1000/config.TPS); // Calls tick() TPS times each second;
    }

    tick() {
        this.env.generate_movement(this.config.APT) // check physics and generates movement
                .apply_movement(this.config.APT) // moves everything in Environment
                .apply_friction(this.config.APT) // applies friction of environment
                .starve(this.config.APT) // makes 'em starve
                .check_dead() // removes dead cells and destroyed connections
                .check_reproduction() // let 'em reproduce
                .update_graphics(); // this updates shown svg
    }


    render() {
        return (<div id="renderer"/>);
    }
}