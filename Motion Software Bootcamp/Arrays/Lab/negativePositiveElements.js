const actionsMap = {
    true: 'unshift',
    false: 'push'
}

function solve(arr) {
    return arr
        .reduce((result, x) => result[
            actionsMap[x < 0]
        ](x) &&
            result,
            []
        );
}