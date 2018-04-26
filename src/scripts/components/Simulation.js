import React, {Component} from "react";
import {Renderer} from "../containers/Renderer";

export class Simulation extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render () {
        return (<Renderer/>);
    }
}