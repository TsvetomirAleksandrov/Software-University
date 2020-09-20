function negativePositive(arr) {
    let copyArr = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 0) {
            copyArr.push(arr[i]);
            continue;
        }
        else if (arr[i] < 0) {
            copyArr.unshift(arr[i]);
            continue;
        }
        else if (arr[i] === 0) {
            copyArr.push(arr[i]);
            continue;
        }
    }

    console.log(copyArr.join('\n'));
}

negativePositive([7, -2, 8, 9]);