function solve(input) {
    let result = input.map(([width, height]) => ({
        width,
        height,
        area: () => this.width * this.height,
        compareTo(rect) {
            let result = rect.area() - this.area();

            return result == 0 
                ? rect.width - this.width
                : result
        }
    }))
    .sort((a, b) => a.compareTo(b));

    // result.forEach(x => console.log(x.area()));

    console.log(result);
}

solve([[10, 5], [5, 12]]);