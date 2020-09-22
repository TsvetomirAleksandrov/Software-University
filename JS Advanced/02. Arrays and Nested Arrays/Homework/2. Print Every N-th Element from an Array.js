function nthElement(arr){
const step = +arr.pop();

for(let i = 0; i < arr.length; i+=step){
console.log(arr[i]);
}
}


nthElement(['dsa',
'asd',
'test',
'tset',
'2']);