import React, {Component} from "react";
import Graphics from "../graphics";
import Cell from "../sprites/Cell"
import "../../styles/components/Renderer.css"

export class Renderer extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    componentDidMount() {
        this.can = document.getElementById("renderer-canvas");
        this.div = document.getElementById("renderer");
        this.can.height = this.div.offsetHeight;
        this.can.width = this.div.offsetWidth;
    }

    render() {
        return (
            <div id="renderer">
                <canvas id="renderer-canvas"></canvas>
            </div>
        );
    }
}