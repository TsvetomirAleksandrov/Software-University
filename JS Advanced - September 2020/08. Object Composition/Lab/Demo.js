
//AGGREGATION//
// let students = [
//     { name: 'Pesho', score: 1 },
//     { name: 'Gosho', score: 2 },
//     { name: 'Pesho', score: 3 },
//     { name: 'Mariya', score: 2 },
//     { name: 'Ivan', score: 5 },
// ];

// let res1 = students.reduce((acc, curr, index, array) => {
//     let same = acc.find(s => s.name === curr.name);
//     if (!same) {
//         acc.push(curr);
//     } else {
//         same.score += curr.score;
//     }
//     return acc;
// }, []);

// console.log(res1);


//CONCATENATION//
let props = [
    {name: 'Pesho'},
    {age: 22},
    {height: 190},
    {eyeColor: 'blue'},
];

let person = props.reduce((acc, x) => {
    return {...acc, ...x}
}, {});