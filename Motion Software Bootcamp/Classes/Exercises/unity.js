class Rat {
    constructor(name) {
        this.name = name;
        this.rats = [];
    }

    unite(otherRat) {
        if (!this.rats.includes(otherRat)) {
            this.rats.push(otherRat);
        }
    }

    getRats() {
        return this.rats.join('\n');
    }

    toString() {
        let names = this.name

        for (const rat of this.rats) {
            names += `\n##${rat.name}`;
        }

        return names;
    }
}

let firstRat = new Rat('Peter');

firstRat.unite(new Rat('George'));
firstRat.unite(new Rat('Alex'));

console.log(firstRat.toString());
// Peter
// ##George
// ##Alex