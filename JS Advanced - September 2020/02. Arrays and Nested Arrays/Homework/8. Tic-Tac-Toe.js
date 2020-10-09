function ticTac(arr) {
    let matrix = [[false, false, false],
    [false, false, false],
    [false, false, false]];

    player = 'X';

    while (arr.length > 0) {
        let [ind, j] = arr.shift().split(' ').map(Number);
        if (!matrix[ind][j]) {
            matrix[ind][j] = player;
            player = player == 'X' ? 'O' : 'X';
        }
        else {
            console.log(`This place is already taken. Please choose another!`)
        }
        let winner = check(matrix);
        if (winner != false) {
            console.log(`Player ${winner} wins!`);
            matrix.forEach(row => console.log(row.join('\t')));
            return;
        }
        else if (isFull(matrix)) {
            console.log(`The game ended! Nobody wins :(`);
            matrix.forEach(row => console.log(row.join('\t')));
            return;
        }
    }

    function isFull(matrix) {
        let noFalse = true;
        matrix.forEach(row => {
            row.forEach(position => {
                if (position == false) {
                    noFalse = false;
                }
            })
        })
        return noFalse;
    }

    function check(area) {
        let flag = '';
        for (let i = 0; i < area.length; i++) {
            if (i == 0) {
                if ((area[i][i] == area[i][i + 1] && area[i][i] == area[i][i + 2]) || (area[i][i] == area[i + 1][i] && area[i][i] == area[i + 2][i])) {
                    flag = area[i][i];
                }
            } else if (i == 1) {
                if (((area[i - 1][i] == area[i][i] && area[i][i] == area[i + 1][i]) || (area[i][i - 1] == area[i][i] && area[i][i] == area[i][i + 1]) || (area[i - 1][i - 1] == area[i][i] && area[i][i] == area[i + 1][i + 1]) || (area[i - 1][i + 1] == area[i][i] && area[i][i] == area[i + 1][i - 1]))) {
                    flag = area[i][i];
                }
 
            } else if (i == 2) {
                if ((area[i][i] == area[i][i - 1] && area[i][i] == area[i][i - 2]) || (area[i][i] == area[i - 1][i] && area[i][i] == area[i - 2][i])) {
                    flag = area[i][i];
                }
            }
        }
        return flag;
    }
}