(function solve() {
    Array.prototype.last = () => {
        return this[this.length - 1];
    };

    Array.prototype.skip = (n) => {
        return this.slice(n);
    };

    Array.prototype.take = (n) => {
        return this.slice(0, n);
    };

    Array.prototype.sum = () => {
        return this.reduce((acc, x) => acc + x, 0);
    };

    Array.prototype.average = () => {
        return this.sum() / this.length;
    };
}());