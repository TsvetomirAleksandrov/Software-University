function biggestElement(arr){
    let biggestEl = Number.NEGATIVE_INFINITY;
    arr.forEach(row => row.forEach(
        col => biggestEl = Math.max(biggestEl, col)));       
        console.log(biggestEl);  
    }

    biggestElement([[20, 50, 10],
        [8, 33, 145]]
       );
