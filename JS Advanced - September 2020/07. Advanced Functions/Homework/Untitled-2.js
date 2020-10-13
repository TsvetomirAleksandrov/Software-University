function listArray(n) {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let number = n;

    for (let i = 0; arr[i] < arr.length(); i++) {
        if (i == number) {
            return i;
        } else {
            return -1;
        }
    }
}



