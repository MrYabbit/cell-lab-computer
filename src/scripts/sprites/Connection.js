import * as config from "../../config";
import * as connedction_config from "../../config/Connection";

export default class Connection {
    constructor(cell1, cell2) {
        this.cell1 = cell1;
        this.cell2 = cell2;
        this.config = connedction_config;
        this.draw = {
            root: this.cell1.env.g.draw.group().move(this.cell1.x, this.cell2.y),
        };

        this.draw.line = this.draw.root.line(this.cell1.position.x, this.cell1.position.y, this.cell2.position.x, this.cell2.position.y).stroke({
            color: this.config.CONNECTION_COLOR,
            width: this.config.CONNECTION_WIDTH,
            linecap: "round"
        });
    }
}