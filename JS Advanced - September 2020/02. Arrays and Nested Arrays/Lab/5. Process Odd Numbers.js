function evenPosition(arr) {
    let copyArr = [];
    for (let i = 0; i < arr.length; i++) {
        if(i % 2 !== 0){
        copyArr.push(arr[i] * 2);
        }
    }
     copyArr.reverse();
     console.log(copyArr.join(' '));
}

evenPosition([10, 15, 20, 25]);