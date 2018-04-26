import React, {Component} from "react";
import "../../styles/components/Renderer.css"

export class Renderer extends Component {
    constructor (props) {
        super(props);
        this.state = {

        };
    }

    render () {
        return (
            <div id="renderer">
                Rendered
            </div>
        );
    }
}