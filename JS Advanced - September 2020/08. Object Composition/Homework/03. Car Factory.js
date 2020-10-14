function carFactory(order) {
    let { model, power, color, carriage, wheelSize } = order;

    const engines = [{ power: 90, volume: 1800 },
                    { power: 120, volume: 2400 },
                    { power: 200, volume: 3500 }];

    const result = {
        model,
        engine: engines.find((e) => e.power >= power),
        carriage: { type: carriage, color },
        wheels: [0, 0, 0, 0].map((w) => (wheelSize % 2 === 0 ? --wheelSize : wheelSize)),
    };

    return result;
}

console.log(carFactory({ model: 'VW Golf II',
power: 90,
color: 'blue',
carriage: 'hatchback',
wheelsize: 14 }
));