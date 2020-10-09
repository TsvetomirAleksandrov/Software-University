function equalNeighbors(matrix){
    let result = 0;
    let i, j;

    for(i = 0; i < matrix.length; i++){
        for(j = 0; j < matrix[i].length; j++){
            if((j < matrix[i].length - 1) && (matrix[i][j + 1] == matrix[i][j])){
                result++;
            }
            if((i < matrix.length - 1) && (matrix[i + 1][j] == matrix[i][j])){
                result++;
            }
        }
    }
    console.log(result);
}