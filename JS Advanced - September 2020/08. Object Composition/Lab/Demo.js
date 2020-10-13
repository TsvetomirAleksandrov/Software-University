let cats = [
    { name: 'Navcho', age: 5 },
    { name: 'Garry', age: 2 },
    { name: 'Misho', age: 3 },
];


let newCats = [...cats];

newCats.forEach(x => {
    x.age++;
});

console.log(newCats);