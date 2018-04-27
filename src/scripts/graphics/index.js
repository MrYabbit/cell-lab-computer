
export default class Graphics {
    constructor (canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
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
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2*Math.PI);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    draw_line(x1, y1, x2, y2, color, width) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineWidth = width;
        this.ctx.lineTo(x2, y2);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
    }
}