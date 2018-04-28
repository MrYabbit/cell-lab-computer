export default class Sprite {
    constructor(graphics, environment, x, y) {
        this.g = graphics;
        this.environment = environment;
        this.x = x;
        this.y = y;
        this.id = this.environment.get_id();
    }

    draw() {
        this.g.draw_circle(this.x, this.y, "red");
    }
}