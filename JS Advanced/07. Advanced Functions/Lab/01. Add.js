function solution(a) {
    return (b) => {
        return a + b;
    }
}

let add5 = solution(5);
console.log(add5(2));
console.log(add5(3));