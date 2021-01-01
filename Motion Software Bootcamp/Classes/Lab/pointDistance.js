class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static distance(p1, p2) {
        var xDistance = p2.x - p1.x;
        var yDistance = p2.y - p1.y;

        xDistance *= xDistance;
        yDistance *= yDistance;
        
        return Math.sqrt(xDistance + yDistance);
    }
}

let p1 = new Point(5, 5);
let p2 = new Point(9, 8);
console.log(Point.distance(p1, p2));