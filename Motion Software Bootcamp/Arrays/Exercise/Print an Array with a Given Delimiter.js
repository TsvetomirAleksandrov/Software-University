function solve(arr) {
    let delimiter = arr.pop();
    return arr.join(`${delimiter}`);
}

console.log(solve(['How about no?', 'I', 'will', 'not', 'do', 'it!', '_']));