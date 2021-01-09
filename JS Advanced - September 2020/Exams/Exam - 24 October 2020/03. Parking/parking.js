class Parking {
    constructor(capacity) {
        this.capacity = capacity;
        this.vehicles = [];
    }

    addCar(carModel, carNumber) {
        let car = {
            carModel,
            carNumber,
            payed: false
        }

        let hasCar = this.vehicles.find(c => c.carNumber === carNumber);

        if (this.vehicles.length >= this.capacity) {
            throw new Error('Not enough parking space.');
        }

        if (!hasCar) {
            this.vehicles.push(car);
            return `The ${carModel}, with a registration number ${carNumber}, parked.`;
        }
    }

    removeCar(carNumber) {
        let car = this.vehicles.find(c => c.carNumber === carNumber);

        if (car === undefined) {
            throw new Error('The car, you\'re looking for, is not found.')
        } else if (car.payed == false) {
            throw new Error(`${carNumber} needs to pay before leaving the parking lot.`)
        } else {
            this.vehicles.splice((this.vehicles.indexOf(car)), 1);
            return `${carNumber} left the parking lot.`;
        }
    }

    pay(carNumber) {
        let car = this.vehicles.find(c => c.carNumber === carNumber);

        if (car === undefined) {
            throw new Error(`${carNumber} is not in the parking lot.`);
        } else if (car.payed === true) {
            throw new Error(`${carNumber}'s driver has already payed his ticket.`);
        }

        car.payed = true;
        return `${carNumber}'s driver successfully payed for his stay.`;

    }

    getStatistics(carNumber) {
        if (carNumber) {
            let car = this.vehicles.find(c => c.carNumber === carNumber);
            return `${car.carModel} == ${carNumber} - ${car.payed ? `Has payed` : `Not payed`}`;
        } else {
            let result = [`The Parking Lot has ${this.capacity - this.vehicles.length} empty spots left.`];
            this.vehicles.sort((a, b) => a.carModel.localeCompare(b.carModel))
                .forEach(car => {
                    result.push(`${car.carModel} == ${car.carNumber} - ${car.payed ? 'Has payed' : 'Not payed'}`);
                })

            return result.join('\n');

        }
    }
}

const parking = new Parking(12);

console.log(parking.addCar("Volvo t600", "TX3691CA"));
console.log(parking.getStatistics());

console.log(parking.pay("TX3691CA"));
console.log(parking.removeCar("TX3691CA"));
