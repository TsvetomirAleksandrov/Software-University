function biggestElement(arr){
    let biggestElement = Number.NEGATIVE_INFINITY;
    arr.forEach(row => row.forEach(
        col => biggestElement = Math.max(biggestElement, col)));       
        console.log(biggestElement);  
    }

    biggestElement([[20, 50, 10],
        [8, 33, 145]]
       );
