import * as graphics_config from "../../config/graphics";
import SVG from "svg.js";

export default class Graphics {
    constructor (parent_id) {
        this.parent = document.getElementById(parent_id); // gets parent element
        this.config = graphics_config;

        this.draw = SVG(parent_id); // initializes svg canvas

        this.colors = { // basic colors
            red:    "#FF0000",
            green:  "#00FF00",
            blue:   "#0000FF",
            white:  "#FFFFFF",
            black:  "#000000"
        };
    }
}