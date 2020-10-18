function classHierarchy() {
    class Figure {
      constructor(unit = 'cm') {
        this.unit = unit;
      }
   
      get area() {
        return NaN;
      }
   
      changeUnits(x) {
        this.unit = x;
      }
   
      calcWidthUnit(x) {
        const units = {
          m: 0.01,
          cm: 1,
          mm: 10,
        };
   
        return x * units[this.unit];
      }
   
      toString() {
        return `Figures units: ${this.unit} Area: ${this.area}`;
      }
    }
   
    class Circle extends Figure {
      constructor(radius = 0, ...rest) {
        super(...rest);
        this.radius = radius;
      }
   
      get area() {
        return Math.PI * Math.pow(super.calcWidthUnit(this.radius), 2);
      }
   
      toString() {
        return `${super.toString()} - radius: ${super.calcWidthUnit(this.radius)}`;
      }
    }
   
    class Rectangle extends Figure {
      constructor(width = 0, height = 0, ...rest) {
        super(...rest);
        this._width = width;
        this._height = height;
      }
   
      get height() {
        return this.calcWidthUnit(this._height);
      }
   
      get width() {
        return this.calcWidthUnit(this._width);
      }
   
      set height(newHeight) {
        this._height = newHeight;
      }
   
      set width(newWidth) {
        this._width = newWidth;
      }
   
      get area() {   
        return this.calcWidthUnit(this._width) * this.calcWidthUnit(this._height);
      }
   
      toString() {
        return `${super.toString()} - width: ${this.calcWidthUnit(this._width)}, height: ${this.calcWidthUnit(this._height)}`;
      }
    }
   
    return { Figure, Circle, Rectangle };
  }