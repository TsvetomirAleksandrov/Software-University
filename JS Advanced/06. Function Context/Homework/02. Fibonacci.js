function getFibonator() {
    let fibs = [1, 1];
    let calls = 0;
    return function () {
        calls++;

        if (calls - 1 > 1)
        fibs.push(fibs[calls - 3] + fibs[calls -2]);
        return fibs[calls - 1];
    }
}

let fib = getFibonator();
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());