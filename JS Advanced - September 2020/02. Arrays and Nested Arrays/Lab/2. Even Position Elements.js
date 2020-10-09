function evenPosition(arr) {
    let copyArr = [];
    for (let i = 0; i < arr.length; i++) {
        if(i % 2 === 0){
        copyArr.push(arr[i]);
        }
    }
     console.log(copyArr.join(' '));
}

evenPosition(['20', '30', '40']);
