export default class Sprite {
    constructor(graphics, x, y) {
        this.g = graphics;
        this.x = x;
        this.y = y;
        this.type = undefined;
    }

    draw() {
        this.g.draw_circle(this.x, this.y, "red");
    }
}