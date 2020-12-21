function solve(arr) {
    let currentNumber;
    let newArray = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < currentNumber) {
            continue;
        }
        currentNumber = arr[i];
        newArray.push(currentNumber);
    }

    return newArray;
}

console.log(solve([1,
    3,
    8,
    4,
    10,
    12,
    3,
    2,
    24]));