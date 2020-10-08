class Hex {
    constructor(value) {
        this.value = value;
    }

    toString() {
        return "0x" + this.value.toString(16).toUpperCase();
    }

    valueOf() {
        return this.value;
    }

    plus(hex) {
        return new Hex(this.value + hex);
    }

    minus(hex) {
        return new Hex(this.value - hex);
    }

    static parse(hex) {
        return parseInt(hex, 16);
    }
}