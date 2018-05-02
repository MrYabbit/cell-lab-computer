import * as graphics_config from "../../config/graphics";
import SVG from "svg.js";

export default class Graphics {
    constructor (parent_id) {
        this.parent = document.getElementById(parent_id);
        this.config = graphics_config;

        this.draw = SVG(parent_id);
    }
}