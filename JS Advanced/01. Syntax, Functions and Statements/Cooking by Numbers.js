function cooking(arr) {
    let num = parseInt(arr[0]);
    arr.shift();
    for (const element of arr) {
        switch (element) {
            case 'chop':
                num /= 2;
                break;
            case 'dice':
                num = Math.sqrt(num);
                break;
            case 'spice':
                num += 1;
                break;
            case 'bake':
                num *= 3;
                break;
            case 'fillet':
                num *= 0.80;
                break;
        }
        console.log(num);
    }
}

cooking(['32', 'chop', 'chop', 'chop', 'chop', 'chop']);