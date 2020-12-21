function solve(arr) {
    let n = arr.pop();
    let newArr = arr.filter(function(value, index, arr) {
        return index % n == 0;
    });

    return newArr.join('\n');
}

console.log(solve(['5', '20', '31', '4', '20', '2']));