function solve(arr) {
    return arr
        .slice()
        .sort(
            (a, b) => a - b)
        .slice(0, 3);
}