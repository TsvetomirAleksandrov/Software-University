function bmi(name, age, weight, height) {
    const person = {
        name: name,
        PersonalInfo: {
            age: age,
            weight: weight,
            height: height,
        },
        BMI: calculateBMI(weight, height),
        status: bmiCategory(calculateBMI(weight, height))
    }


    function bmiCategory(bmi) {
        if (bmi < 18.5) {
            return "Underweight";
        } else if (bmi < 25) {
            return "Normal";
        } else if (bmi < 30) {
            return "Overweight";
        } else {
            return "Obese";
        }
    }

    function calculateBMI(weight, height) {
        let bmi = weight / (height / 100 * height / 100);

        return Math.round(bmi);
    }

    if (person.status === 'Obese') {
        person.recommendation = 'admission required';
    }

    return person;
}

console.log(bmi('Honey boo boo', 9, 57, 137));