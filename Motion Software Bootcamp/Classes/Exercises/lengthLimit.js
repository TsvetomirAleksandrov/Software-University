class Stringer {
    constructor(innerString, innerLength) {
        this.innerString = innerString;
        this.innerLength = Number(innerLength);
    }

    increase(value) {
        this.innerLength += value;
    }

    decrease(value) {
        this.innerLength -= value;
        if (this.innerLength < 0) {
            this.innerLength = 0;
        }
    }

    toString() {
        let result = '';

        if (this.innerLength !== 0) {
            result += this.innerString.slice(0, this.innerLength);
        } else if (this.innerLength < this.innerString.length) {
            result += '...';
        }

        return result;
    }
}

let test = new Stringer('Test', 5);
console.log(test.toString()); // Test
test.decrease(3);
console.log(test.toString()); // Te...
// test.decrease(5);
// console.log(test.toString()); // ...
// test.increase(4);
// console.log(test.toString()); // Test