function intersect(a, b) {
    return a.filter((element, index) => b[index] === element).length;
}

function solve(arr) {
    let result = 0;

    for (let i = 0; i < array.length - 1; i++) {
        result += intersect(arr[i], arr[i + 1]);
    }

    return result;
}