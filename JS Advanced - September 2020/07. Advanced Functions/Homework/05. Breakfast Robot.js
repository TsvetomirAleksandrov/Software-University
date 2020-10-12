function robot() {
    function prepare(prepareObject) {
        for (const key in prepareObject) {
            if (prepareObject[key] > stocks[key]) {
                return `Error: not enough ${key} in stock`;
            }
        }
        for (const key in prepareObject) {
            stocks[key] -= prepareObject[key];
        }
        return `Success`;
    }
    let stocks = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0,
        print: function () {
            return `protein=${this.protein} carbohydrate=${this.carbohydrate} fat=${this.fat} flavour=${this.flavour}`;
        },
        restock: function (stock, quantity) {
            this[stock] += quantity;
            return 'Success';
        }
    };
    let recipies = {
        apple: q => prepare({ carbohydrate: 1 * q, flavour: 2 * q }),
        lemonade: q => prepare({ carbohydrate: 10 * q, flavour: 20 * q }),
        burger: q => prepare({ carbohydrate: 5 * q, fat: 7 * q, flavour: 3 * q }),
        eggs: q => prepare({ protein: 5 * q, fat: 1 * q, flavour: 1 * q }),
        turkey: q => prepare({ protein: 10 * q, carbohydrate: 10 * q, fat: 10 * q, flavour: 10 * q })
    };
    return function (command) {
        let commandParts = command.split(' ');
        switch (commandParts[0]) {
            case 'restock':
                return stocks.restock(commandParts[1], Number(commandParts[2]));
            case 'prepare':
                return recipies[commandParts[1]](Number(commandParts[2]));
            case 'report':
                return stocks.print();
        }
    }
}

