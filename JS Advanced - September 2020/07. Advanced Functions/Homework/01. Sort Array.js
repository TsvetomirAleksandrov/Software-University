function arrSort(arr, input) {
    let sorter = filter();
    return sorter[input](arr);
    function filter () {
        return {
            asc: (s) => s.sort((a, b) => a - b),
            desc: (s) => s.sort((a, b) => b - a) 
        }
    }
}

console.log(arrSort([14, 7, 17, 6, 8], 'asc'));