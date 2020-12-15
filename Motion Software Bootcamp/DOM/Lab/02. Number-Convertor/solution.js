function solve() {
    const menu = document.getElementById('selectMenuTo');
    const optionBinary = document.createElement('option');
    optionBinary.value = 'binary';
    optionBinary.text = 'Binary';
    menu.appendChild(optionBinary);

    const optionHexadecimal = document.createElement('option');
    optionHexadecimal.value = 'hexadecimal';
    optionHexadecimal.text = 'Hexadecimal';
    menu.appendChild(optionHexadecimal);

    document.querySelector('button').addEventListener('click', clickHandler);

    function clickHandler() {
        let number = document.getElementById('input').value;
        let result = convertNumber(number);
        showResult(result);
    }

    function convertNumber(number) {
        let result;

        if (menu.value === 'binary') {
            result = Number(number).toString(2);
        } else if (menu.value === 'hexadecimal') {
            result = Number(number).toString(16).toUpperCase();
        }
        return result;
    }

    function showResult(result) {
        const outputField = document.getElementById('result');
        outputField.value = result;
    }
}