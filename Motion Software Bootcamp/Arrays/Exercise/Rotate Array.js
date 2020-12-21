function solve(arr) {
    let n = arr.pop();

    for (let i = 0; i < n; i++) {
        arr.unshift(arr.pop());
    }

    return arr;
}

console.log(solve(['Banana', 'Orange', 'Coconut', 'Apple', '15']));