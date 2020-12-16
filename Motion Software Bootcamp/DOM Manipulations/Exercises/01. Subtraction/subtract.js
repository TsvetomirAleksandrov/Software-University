function subtract() {
    let firstNumber = document.getElementById('firstNumber');
    let secondNumber = document.getElementById('secondNumber');
    let resultDiv = document.getElementById('result');

    let sub = Number(firstNumber.value) - Number(secondNumber.value)

    if (firstNumber.value !== '' && secondNumber.value !== '') {
        resultDiv.textContent = `${sub}`;
    }

}