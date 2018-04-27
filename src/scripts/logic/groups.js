export class CellGroup {
    constructor() {
        this.objects = [];
    }

    add(obj) {
        this.objects.push(obj);
    }

    _check_collision(obj1, obj2) {
        return Math.sqrt(Math.pow(obj1.x - obj2.x, 2) + Math.pow(obj1.y - obj2.y, 2)) < obj1.get_radius() + obj2.get_radius();
    }

    collide(obj) {
        let colllided = [];
        for (let i = 0; i < this.objects.length; ++i) {
            if (this._check_collision(this.objects[i], obj) && !Object.is(obj, this.objects[i])) {
                colllided.push(this.objects[i]);
            }
        }
        return colllided;
    }

    draw () {
        this.objects.forEach(function (obj) {
            obj.draw();
        });
    }

    starve (coef) {
        this.objects.forEach(function (obj) {
            obj.starve(coef);
        });
    }

    died () {
        for (let i = 0; i < this.objects.length; ++i) {
            if (this.objects[i].died()) {
                this.objects.splice(i, 1);
            }
        }
    }

    move (coef) {
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