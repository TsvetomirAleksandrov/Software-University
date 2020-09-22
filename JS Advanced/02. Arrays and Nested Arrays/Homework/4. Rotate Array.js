function rotateArray(arr) {
    let rotationAmount = arr.pop();

    for (let i = 0; i < rotationAmount % arr.length; i++) {
        arr.unshift(arr.pop());
    }
    console.log(arr.join(' '));
}

rotateArray(['Banana', 'Orange', 'Coconut', 'Apple', '15']);