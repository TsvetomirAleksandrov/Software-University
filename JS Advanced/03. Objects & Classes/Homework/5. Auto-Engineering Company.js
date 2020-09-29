function autoEngineering(input) {
    let cars = new Map();

    input.forEach(line => {
        let [carBrand, carModel, producedCars] = line.split(' | ');

        producedCars = Number(producedCars);

        if (!cars.get(carBrand)) {
            cars.set(carBrand, new Map());
        }

        if(!cars.get(carBrand).get(carModel)) {
            cars.get(carBrand).set(carModel, 0);
        } 
      
        cars.get(carBrand).set(carModel, cars.get(carBrand).get(carModel) + producedCars);
    });

    for(let [carBrand, currentModel] of cars) {
        console.log(carBrand);

        for(let [carModel, producedCars] of currentModel) {
            console.log(`###${carModel} -> ${producedCars}`);
        }
    }
}


autoEngineering(['Audi | Q7 | 1000', 'Audi | Q6 | 100', 'BMW | X5 | 1000', 'BMW | X6 | 100', 'Citroen | C4 | 123', 'Volga | GAZ-24 | 1000000', 'Lada | Niva | 1000000', 'Lada | Jigula | 1000000', 'Citroen | C4 | 22', 'Citroen | C5 | 10']);