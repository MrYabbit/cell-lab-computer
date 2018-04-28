export class CellGroup {
    constructor() {
        this.objects = [];
    }

    add(obj) {
        this.objects.push(obj);
    }

    _check_collision(obj1, obj2) { //Check whether two cells collide or not
        return Math.sqrt(Math.pow(obj1.x - obj2.x, 2) + Math.pow(obj1.y - obj2.y, 2)) < obj1.get_radius() + obj2.get_radius();
    }

    get_collided(obj) { // gives you all cells in this.objects that colllide with give obj cell
        let colllided = [];
        for (let i = 0; i < this.objects.length; ++i) {
            if (this._check_collision(this.objects[i], obj) && !Object.is(obj, this.objects[i])) {
                colllided.push(this.objects[i]);
            }
        }
        return colllided;
    }

    collide (coef) { // calls .colide() on all cells hta are in collision with correct parameters
        this.objects.forEach((obj) => {
            let collided = this.get_collided(obj);
            for (let i = 0; i < collided.length; ++i) {
                obj.collide(collided[i], coef);
            }
            obj.collide_with_edge(coef);
        });
    }

    draw () { // draws all cells
        this.objects.forEach(function (obj) {
            obj.draw();
        });
    }

    starve (coef) { // let all cells starve
        this.objects.forEach(function (obj) {
            obj.starve(coef);
        });
    }

    died () { // removes dead cells
        for (let i = 0; i < this.objects.length; ++i) {
            if (this.objects[i].died()) {
                this.objects.splice(i, 1);
            }
        }
    }

    move (coef) { // call .move() method on all cells in group
        this.objects.forEach(function (obj) {
            obj.move(coef);
        });
    }
}

export class FoodGroup {
    constructor () {
        this.objects = [];
    }

    add (obj) {
        this.objects.push(obj);
    }

    draw() {
        this.objects.forEach(function (obj) {
            obj.draw();
        });
    }

    starve (coef) {
        this.objects.forEach(function (obj) {
            obj.starve(coef);
        })
    }
}