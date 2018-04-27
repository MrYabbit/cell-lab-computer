import React, {Component} from "react";
import Graphics from "../graphics";
import Cell from "../sprites/Cell"
import "../../styles/components/Renderer.css"

export class Renderer extends Component {
    constructor (props) {
        super(props);
    }

    componentDidMount() {
        this.can = document.getElementById("renderer-canvas");
        this.g = new Graphics(this.can);
        this.cells = [new Cell(this.g, 100, 100 ,100)];
        for (let i = 0; i < this.cells.length; ++i) {
            this.cells[i].draw();
        }
    }

    render () {
        return (
            <div id="renderer">
                <canvas id="renderer-canvas"></canvas>
            </div>
        );
    }
}