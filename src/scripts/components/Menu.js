import React, {Component} from "react";
import "../../styles/components/Menu.css";

export class Menu extends Component {
    constructor (props) {
        super(props);
        this.state = {
            expanded: false
        };
        this.toggle_expand = () => {
            this.setState((state) => {
                return {
                    expanded: !state.expanded
                };
            });
        };
    }

    render () {
        return (
            <div id={"menu"}>
                <button id="menu-button" onClick={this.toggle_expand}>Menu</button>
                <div id={"expanded-menu"} className={this.state.expanded?"menu-shown":"menu-hidden"}>
                    There is <br/> something <br/> in the expanded <br/> menu <br/> like this<br/> <label>option:</label> <input/>
                </div>
            </div>
        );
    }
}