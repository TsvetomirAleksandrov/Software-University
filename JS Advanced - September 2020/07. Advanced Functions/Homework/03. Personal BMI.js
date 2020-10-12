
function bmi(name, age, weight, height) {
    let obj = {
        name,
        personalInfo: { age, weight, height }
    };
    obj.BMI = Math.round(weight / (height / 100) ** 2);
    if (obj.BMI < 18.5) {
        obj.status = 'underweight';
    }
    else if (obj.BMI < 25) {
        obj.status = 'normal';
    }
    else if (obj.BMI < 30) {
        obj.status = 'overweight';
    }
    else {
        obj.status = 'obese';
        obj.recommendation = 'admission required';
    }
    return obj;
}

console.log(bmi("Peter", 29, 75, 182));