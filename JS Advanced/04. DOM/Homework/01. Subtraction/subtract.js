function subtract() {
    let firstNumber = Number(document.getElementById('firstNumber').value);
    let secondNumber = Number(document.getElementById('secondNumber').value);

    document.getElementById('result').textContent = firstNumber - secondNumber;
}