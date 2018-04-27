import React, {Component} from "react";
import Graphics from "../graphics";
import Cell from "../sprites/Cell"
import "../../styles/components/Renderer.css"

export class Renderer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="renderer">
                <canvas id="renderer-canvas"></canvas>
            </div>
        );
    }
}