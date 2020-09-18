//Rest Operator
let numbers = [10, 20, 30, 40, 50];
let [a, b, rest] = numbers;

console.log(a);
console.log(b);
console.log(rest);


//Pop - Removes the last element from an array and returns that element
let nums = [10, 20, 30, 40, 50, 60, 70];
console.log(nums.length); // 7
console.log(nums.pop()); // 70
console.log(nums.length); // 6
console.log(nums);


//Push - adds one or more elements to the end of an array
let nums = [10, 20, 30, 40, 50, 60, 70];
console.log(nums.length); // 7
console.log(nums.push(80)); // 8 (nums.length)
console.log(nums);


//Shift - Removes the first element from an array
let nums = [10, 20, 30, 40, 50, 60, 70];
console.log(nums.length); // 7
console.log(nums.shift()); // 10 (removed element)
console.log(nums); // [ 20, 30, 40, 50, 60, 70, 80 ]


//Unshift - Adds one or more elements to the beginning of an array and returns the new length of the array
let nums = [40, 50, 60];
console.log(nums.length); // 3
console.log(nums.unshift(30)); // 4 (nums.length)
console.log(nums.unshift(10,20)); // 6 (nums.length)
console.log(nums); // [ 10, 20, 30, 40, 50, 60 ]


//Splice - Changes the contents of an array by removing or replacing existing elements and/or adding new elements
let nums = [1, 3, 4, 5, 6];
nums.splice(1, 0, 2); // inserts at index 1
console.log(nums); // [ 1, 2, 3, 4, 5, 6 ]
nums.splice(4,1,19); // replaces 1 element at index 4
console.log(nums); // [ 1, 2, 3, 4, 19, 6 ]
let el = nums.splice(2,1); // removes 1 element at index 2
console.log(nums); // [ 1, 2, 4, 19, 6 ]
console.log(el); // [ 3 ]


//Fill - Fills all the elements of an array from a start index to an end index with a static value
let arr = [1, 2, 3, 4];
//fill with 0 from position 2 until position 4
console.log(arr.fill(0, 2, 4)); // [1, 2, 0, 0]
//fill with 5 from position 1
console.log(arr.fill(5, 1)); // [1, 5, 5, 5]
console.log(arr.fill(6)); // [6, 6, 6, 6]


//Reverse - reverses the array
let arr = [1, 2, 3, 4];
arr.reverse();
console.log(arr); // [4, 3, 2, 1]


//Sort - Sorts the elements of an array in place and returns the sorted array
let months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months); // ["Dec", "Feb", "Jan", "March"]

let array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1); // [1, 100000, 21, 30, 4]


//Join 
let elements = ['Fire', 'Air', 'Water'];
console.log(elements.join()); // "Fire,Air,Water"
console.log(elements.join('')); // "FireAirWater"
console.log(elements.join('-')); // "Fire-Air-Water"
console.log(['Fire'].join(".")); // Fire


//IndexOf
const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
console.log(beasts.indexOf('bison')); // 1
// start from index 2
console.log(beasts.indexOf('bison', 2)); // 4
console.log(beasts.indexOf('giraffe')); // -1


//Concat
const num1 = [1, 2, 3];
const num2 = [4, 5, 6];
const num3 = [7, 8, 9];
const numbers = num1.concat(num2, num3);
console.log(numbers); // [1, 2, 3, 4, 5, 6, 7, 8, 9]


//Includes
// array length is 3
// fromIndex is -100
// computed index is 3 + (-100) = -97
let arr = ['a', 'b', 'c'];
arr.includes('a', -100); // true
arr.includes('b', -100); // true
arr.includes('c', -100); // true
arr.includes('a', -2); // false


//Slice
let fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
let citrus = fruits.slice(1, 3);
let fruitsCopy = fruits.slice();
// fruits contains ['Banana', 'Orange', 'Lemon', 'Apple',
'Mango']
// citrus contains ['Orange','Lemon']


//ForEach
const items = ['item1', 'item2', 'item3'];
const copy = [];
// For loop
for (let i = 0; i < items.length; i++) {
copy.push(items[i]);
}
// ForEach
items.forEach(item => { copy.push(item); });


//Filter
let fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];
// Filter array items based on search criteria (query)
function filterItems(arr, query) {
return arr.filter(function(el) {
return el.toLowerCase().indexOf(query.toLowerCase()) !== -1;
});
};
console.log(filterItems(fruits, 'ap')); // ['apple', 'grapes']


//Find
let array1 = [5, 12, 8, 130, 44];
let found = array1.find(function(element) {
return element > 10;
});
console.log(found); // 12


//Some - tests whether at least one element in the array passes the test implemented by the provided function
let array = [1, 2, 3, 4, 5];
let isEven = function(element) {

// checks whether an element is even
return element % 2 === 0;
};
console.log(array.some(isEven)); //true


//Map = creates a new array wit hthe results of calling a provided function on every element in the calling array
let numbers = [1, 4, 9];
let roots = numbers.map(function(num, i, arr){
    return Math.sqrt(num)
});



//Exercises
//Problem 5. Process Odd Numbers

function solve(arr) {
    return arr.filter((a, i) => i % 2 !== 0)
    .map(x => x * 2)
    .reverse()
    .join(' ')
}

//Looping Through a Nested Array
let arr = [[4, 5, 6],
           [6, 5, 4],
           [5, 5, 5]];

           arr.forEach(printRow);
           function printRow(){
               console.log(row);
               row.forEach(printNumber);
           }
           function printNumber(num){
               console.log(num);
           };

//Diagonal Sums
function diagonalSums(input) {
    let firstDiagonal = 0;
    let secondDiagonal = 0;
    let firstIndex = 0;
    let secondIndex = input[0].length - 1;
    input.forEach(array => {
        firstDiagonal += array[firstIndex++];
        secondDiagonal += array[secondIndex--];
    });
    console.log(firstDiagonal + ' ' + secondDiagonal);
}

