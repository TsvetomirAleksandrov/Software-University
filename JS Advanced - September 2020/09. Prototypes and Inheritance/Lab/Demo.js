function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;

}


Person.prototype.speak() = function () {
    console.log(`Hello my name is ${this.firstName} ${this.lastName}`);
}


function createNew(constructor, ...args) {
    let newObject = {};

    Object.setPrototypeOf(newObject, constructor.prototype);

    constructor.apply()

    return newObject;
}

// let person = new Person('Pesho', 'Georgiev');
// let secondPerson = new Person('Shosho', 'Georgiev');

let person = createNew(Person, 'Pesho', 'Georgiev');

console.log(personObj);