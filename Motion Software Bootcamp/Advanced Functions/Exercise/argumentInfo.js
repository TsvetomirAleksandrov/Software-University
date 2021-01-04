function argumentInfo(...data) {
    const obj = {};

    data.forEach(element => {
        let type = typeof element;
        console.log(`${type}: ${element}`);

        if (obj.hasOwnProperty(type)) {
            obj[type]++;
        } else {
            obj[type] = 1;
        }
    });

    Object.defineProperties(obj).sort((a, b) => b[1] - a[1]).forEach(el => console.log(`${el[0]} = ${el[1]}`));
}