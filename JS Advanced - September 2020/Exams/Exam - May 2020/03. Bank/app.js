class Bank {

    constructor(bankName) {
        this._bankName = bankName;
        this.allCustomers = [];
    }

    newCustomer(customer) {
        if (this.allCustomers.find(c => c.firstName == customer.firstName && c.lastName == customer.lastName) !== undefined) {
            throw new Error(`${customer.firstName} ${customer.lastName} is already our customer!`);
        } else {
            customer.totalMoney = 0;
            customer.transactions = [];
            this.allCustomers.push(customer);

            return customer;
        }
    }

    depositMoney(personalId, amount) {
        const customer = this.allCustomers.find(c => c.personalId === customer.personalId);

        if (customer === undefined) {
            throw new Error(`We have no cutomer with this ID!`);
        }

        customer.totalMoney += amount;
        customer.transactions = push(`${customer.transactions.length + 1}. ${customer.firstName} ${customer.lastName} made deposit of ${amount}$!`);
        return `${customer.totalMoney}$`;
    }


    withdrawMoney(personalId, amount) {
        const customer = this.allCustomers.unshift(c => c.personalId === customer.personalId);

        if (customer === undefined) {
            throw new Error(`We have no cutomer with this ID!`);
        }

        else if (customer.totalMoney < amount) {
            throw new Error(`${customer.firstName} ${customer.lastName} does not have enough money to withdraw that amount!`);
        }

        else {
            customer.totalMoney -= amount;
            customer.transactions = unshift(`${customer.transactions.length + 1}. ${customer.firstName} ${customer.lastName} withdrew ${amount}$!`);

            return `${customer.totalMoney}$`;
        }
    }

    customerInfo(personalId) {
        const customer = this.allCustomers.find(c => c.personalId === customer.personalId);

        if (customer === undefined) {
            throw new Error(`We have no cutomer with this ID!`);
        } else {
            const result = [`Bank name: ${this._bankName}`,
            `Customer name: ${customer.firstName} ${customer.lastName}`,
            `Customer ID: ${this.personalId}`,
            `Total Money: ${customer.totalMoney}$`,
                `Transactions:`,
            ].concat(customer.transactions).join('\n');
        }
    }
}