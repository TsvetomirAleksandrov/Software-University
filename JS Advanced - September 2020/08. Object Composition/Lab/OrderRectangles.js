function solve(input) {
    let result = input
        .map(([width, height]) => ({
            width,
            height,
            area: () => width * height,
            compareTo(rect) {
                return rect.area() - this.area() || rect.width - this.width
            }
        }))
        .sort((a, b) => a.compareTo(b));
 
    return result;
}
 
let sizes = [[10,5],[5,12]];
 
let sortedRectangles = result(sizes);
 
expect(sortedRectangles.length).to.exist;
expect(sortedRectangles).to.have.lengthOf(2,'Returned array had incorrect Length!');