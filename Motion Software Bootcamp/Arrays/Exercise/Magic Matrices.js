function solve(matrix) {
    let rowSum = 0;
    let colSum = 0;

    for (let i = 0; i < matrix.length; i++) {
        let currRowSum = 0;
        let currColSum = 0;

        for (let j = 0; j < matrix[i]; j++) {
            currRowSum += matrix[i][j];
        }
        for (let j = 0; j < matrix.length; j++) {
            currColSum += matrix[j][i];
        }
        if (rowSum != 0 || colSum != 0) {
            if (rowSum != currRowSum || colSum != currColSum) {
                return false;
            }
        } else {
            rowSum = currRowSum;
            colSum = currColSum;
        }
    }
    return true;
}

console.log(solve([[4, 5, 6],
[6, 5, 4],
[5, 5, 5]]));