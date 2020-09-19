function extract(arr) {
    let currentNumber;
    let copyArray = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < currentNumber) {
            continue;
        }
        currentNumber = arr[i];
        copyArray.push(currentNumber);
        console.log(currentNumber);
    }
}

extract([20,
    3,
    2,
    15,
    6,
    1]
);