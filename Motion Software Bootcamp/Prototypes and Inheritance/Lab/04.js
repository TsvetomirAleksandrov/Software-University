function solve() {
    class Figure {
        constructor(unit = 'cm') {
            this.unit = 'cm';
        }

        changeUnits(x) {
            this.unit = x;
        }

        calculateUnit(x) {
            const units = {
                m: 0.01,
                cm: 1,
                mm: 10
            };

            return x * units[this.unit];
        }

        get area() {
            throw new Error("Not implemented figure");
        }

        toString() {
            return `Figures units: ${this.unit} Area: ${this.area}`;
        }
    }

    class Circle extends Figure {
        constructor(radius, ...rest) {
            super(...rest);
            this.radius = radius;
        }

        get area() {
            let radius = this.calculateUnit(this.radius);
            return Math.PI * radius * radius;
        }

        toString() {
            let radius = this.calculateUnit(this.radius);
            return `${super.toString()} radius: ${radius}`
        }
    }

    class Rectangle extends Figure {
        constructor(width, height, ...rest) {
            super(...rest);
            this.width = width;
            this.height = height;
        }

        get area() {
            let width = this.calculateUnit(this.width);
            let height = this.calculateUnit(this.height);
            return width * height;
        }

        toString() {
            let width = this.calculateUnit(this.width);
            let height = this.calculateUnit(this.height);
            return `${super.toString()} width: ${width}, height: ${height}`
        }
    }

    return { Figure, Circle, Rectangle };
}

let classes = solve();
let Figure = classes.Figure;
let Rectangle = classes.Rectangle;
let Circle = classes.Circle;

let c = new Circle(5);
console.log(c.area); // 78.53981633974483
console.log(c.toString()); // Figures units: cm Area: 78.53981633974483 - radius: 5

let r = new Rectangle(3, 4, 'mm');
console.log(r.area); // 1200 
console.log(r.toString()); //Figures units: mm Area: 1200 - width: 30, height: 40

r.changeUnits('cm');
console.log(r.area); // 12
console.log(r.toString()); // Figures units: cm Area: 12 - width: 3, height: 4

c.changeUnits('mm');
console.log(c.area); // 7853.981633974483
console.log(c.toString()) // Figures units: mm Area: 7853.981633974483 - radius: 50