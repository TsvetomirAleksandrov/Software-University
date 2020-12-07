class Parking {
    constructor(capacity) {
        this.capacity = capacity;
        this.vehicles = [];
    }

    addCar(carModel, carNumber) {
        let hasCar = this.vehicles.find(c => c.carNumber === carNumber)

        const car = {
            carModel,
            carNumber,
            payed: false
        }

        if (!this.capacity > 0) {
            throw new Error('Not enough parking space.');
        }

        if (!hasCar) {
            this.vehicles.push(car);
            this.capacity--;

            return `The ${carModel}, with a registration number ${carNumber}, parked.`;
        }
    }

    removeCar(carNumber) {
        let car = this.vehicles.find(c => c.carNumber === carNumber);

        if (!car) {
            throw new Error('The car, you\'re looking for, is not found.');
        }

        if (car.payed === false) {
            throw new Error(`${carNumber} needs to pay before leaving the parking lot.`);
        }

        this.vehicles = this.vehicles.filter(c => c !== car);
        return `${carNumber} left the parking lot.`;

    }

    pay(carNumber) {
        let car = this.vehicles.find(c => c.carNumber === carNumber);

        if (!car) {
            throw new Error(`${carNumber} is not in the parking lot.`);
        }
        if (car.payed === true) {
            throw new Error(`${carNumber}'s driver has already payed his ticket.`);
        }

        car.payed = true;
        return `${carNumber}'s driver successfully payed for his stay.`;

    }

    getStatistics(carNumber) {
        const result = [];

        if (carNumber) {
            let car = this.vehicles.find(c => c.carNumber === carNumber)

            result.push(`The Parking Lot has ${this.capacity} empty spots left.`);
            result.push(`${car.carModel} == ${car.carNumber} - ${car.payed ? 'Has payed' : 'Not payed'}`);
        } else {
            if (this.vehicles.length > 0) {
                const sortedCars = this.vehicles.sort((a, b) => a.carModel.localeCompare(b.carModel));

                result.push(`The Parking Lot has ${this.capacity} empty spots left.`);
                sortedCars.forEach(sc => {
                    result.push(`${sc.carModel} == ${sc.carNumber} - ${sc.payed ? 'Has payed' : 'Not payed'}`);
                });
            }
        }

        return result.join('\n');
    }
}

const parking = new Parking(12);

console.log(parking.addCar("Volvo t600", "TX3691CA"));

console.log(parking.addCar("Mercedes CLK", "BP8671BP"));

console.log(parking.addCar("BMW 750Li", "CB6060CB"));

console.log(parking.getStatistics());

console.log(parking.pay("TX3691CA"));
console.log(parking.removeCar("TX3691CA"));

