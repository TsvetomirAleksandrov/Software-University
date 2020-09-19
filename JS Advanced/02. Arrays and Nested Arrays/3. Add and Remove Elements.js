function addAndRemove(arr) {
    let num = 1;
    let copy = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 'add') {
            copy.push(num++)
        }
        else if (arr[i] === 'remove') {
            copy.pop(num++);
        }
    }

    if (copy[0] === undefined) {
        console.log('Empty')
    } 
    else{
        console.log(copy.join(' '))
    }
}

addAndRemove(['add', 'add', 'remove', 'add', 'add']); 