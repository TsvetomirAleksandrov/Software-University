function solve(fruit, weightInGrams, pricePerKg){
let weightInKg = weightInGrams / 1000;
let totalPrice = weightInKg * pricePerKg;

return `I need $${totalPrice.toFixed(2)} to buy ${weightInKg.toFixed(2)} kilograms ${fruit}.`;
}