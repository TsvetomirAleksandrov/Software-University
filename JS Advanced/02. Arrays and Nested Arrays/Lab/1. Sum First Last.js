function sumFirstLast(arr) {
    let firstElement = +arr[0];
    let lastElement = +arr.pop();

    for (let i = 0; i < 1; i++) {
        let sum = firstElement + lastElement;
        console.log(sum);
    }
}

sumFirstLast(['5']);