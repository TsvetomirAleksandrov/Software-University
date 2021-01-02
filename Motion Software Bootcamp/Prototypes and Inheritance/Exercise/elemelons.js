function solve() {
    class Melon {
        constructor(weight, melonSort) {
            if (new.target === Melon) {
                throw new TypeError('Abstract class cannot be instantiated directly');
            }
            this.weight = Number(weight);
            this.melonSort = melonSort;
        }
    }

    class Watermelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this._elementIndex = 0;
        }

        get elementIndex() {
            return this._elementIndex = this.weight * this.melonSort.length;
        }

        toString() {
            let result = [`Element: ${(this.constructor.name).slice(0, -5)}`,
            `Sort: ${this.melonSort}`,
            `Element Index: ${this.elementIndex}`];

            return result.join('\n');
        }
    }

    class Firemelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.elementIndex = 0;
        }

        get elementIndex() {
            return this.elementIndex = this.weight * this.melonSort.length;
        }

        toString() {
            let result = [`Element: ${(this.constructor.name).slice(0, -5)}`,
            `Sort: ${this.melonSort}`,
            `Element Index: ${this.elementIndex}`];

            return result.join('\n');
        }
    }

    class Earthmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.elementIndex = 0;
        }

        get elementIndex() {
            return this.elementIndex = this.weight * this.melonSort.length;
        }

        toString() {
            let result = [`Element: ${(this.constructor.name).slice(0, -5)}`,
            `Sort: ${this.melonSort}`,
            `Element Index: ${this.elementIndex}`];

            return result.join('\n');
        }
    }

    class Airmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.elementIndex = 0;
        }

        get elementIndex() {
            return this.elementIndex = this.weight * this.melonSort.length;
        }

        toString() {
            let result = [`Element: ${(this.constructor.name).slice(0, -5)}`,
            `Sort: ${this.melonSort}`,
            `Element Index: ${this.elementIndex}`];

            return result.join('\n');
        }
    }

    class Melolemonmelon extends Watermelon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.element = ['Water', 'Fire', 'Earth', 'Air'];
        }

        get elementIndex() {
            return this.weight * this.melonSort.length;
        }

        morph() {
            let a = this.element.shift();
            this.element.push(a);
            return this;
        }

        toString() {
            return `Element: ${this.element[0]}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`;
        }
    }

    return { Melon, Watermelon, Firemelon, Earthmelon, Airmelon, Melolemonmelon };
}


let result = solve();
let Watermelon = result.Watermelon;

let watermelon = new Watermelon(12.5, 'Kingsize');
console.log(watermelon.toString());