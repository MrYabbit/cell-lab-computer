import * as config from "../../config/graphics";
import * as global_config from "../../config";

export default class Graphics_canvas {
    constructor(parent) {
        this.config = config;
        this._canvas = document.createElement("canvas");
        this._canvas.height = parent.offsetHeight;
        this._canvas.width = parent.offsetWidth;
        this.parent = parent;
        this.parent.appendChild(this._canvas);
        this._ctx = this._canvas.getContext("2d");
        this.clear();

        this.colors = {
            red: "#FF0000",
            green: "#00FF00",
            blue: "#0000FF",
            white: "#FFFFFF",
            black: "#000000"
        }
    }

    draw_circle(x, y, radius, color) {
        this._ctx.beginPath();
        this._ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this._ctx.fillStyle = color;
        this._ctx.fill();
    }

    draw_stroke_circle(x, y, radius, color, width=1) {
        this._ctx.beginPath();
        this._ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this._ctx.lineWidth = width;
        this._ctx.strokeStyle = color;
        this._ctx.stroke();

    }

    draw_line(x1, y1, x2, y2, color, width) {
        this._ctx.beginPath();
        this._ctx.moveTo(x1, y1);
        this._ctx.lineWidth = width;
        this._ctx.lineTo(x2, y2);
        this._ctx.strokeStyle = color;
        this._ctx.stroke();
    }

    clear() {
        this._ctx.fillStyle = this.config.BACKGROUND_COLOR;
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }
}

export class Graphics_svg {
    constructor (parent) {

    }
}