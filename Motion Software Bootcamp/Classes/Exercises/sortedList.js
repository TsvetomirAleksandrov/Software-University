class List {
    constructor() {
        this.list = [];
        this.size = 0;
    }

    add(element) {
        this.list.push(element);
        this.list.sort((a, b) => a - b);
        this.size++;
    }

    remove(index) {
        validateIndex(index);
        this.list.splice(index, 1);
        this.size--;
    }

    get(index) {
        validateIndex(index);
        return this.list[index];
    }

    validateIndex(index) {
        if (index < 0 || index >= this.list.length) {
            throw new Error('Invalid index!');
        }
    }
}

let list = new List();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1));
list.remove(1);
console.log(list.get(1));