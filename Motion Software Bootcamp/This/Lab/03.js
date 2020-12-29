function arrayMap(array, func) {
    let mappedArray = array.reduce((a, x) => {
        a.push(func(x))

        return a;
    }, []);

    return mappedArray;
}

