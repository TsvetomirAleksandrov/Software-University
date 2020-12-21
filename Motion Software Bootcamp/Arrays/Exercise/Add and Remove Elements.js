function solve(arr) {
    let num = 1;
    let newArr = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 'add') {
            newArr.push(num++);
        } else if (arr[i] === 'remove') {
            newArr.pop(num++);
        }
    }

    if (newArr[0] === undefined) {
        return 'Empty';
    } else {
        return newArr.join(' ');
    }
}

console.log(solve(['remove', 'remove', 'remove']));