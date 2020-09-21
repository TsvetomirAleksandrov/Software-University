function smallestTwo(arr) {
    let outputArray = arr.sort((a, b) => a - b)
        .slice(0, 2)
        .join(' ');

    console.log(outputArray);
}

smallestTwo([3, 0, 10, 4, 7, 3]);