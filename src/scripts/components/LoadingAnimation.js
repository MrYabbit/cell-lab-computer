import React, {Component} from "react";
import "../../styles/components/LoadingAnimation.css"

export class LoadingAnimation extends Component {
    constructor (props) {
        super(props);
        this.state = {

        };
    }

    render () {
        return (
            <div id={"loading-animation"}>
                Loading ...
            </div>
        );
    }
}