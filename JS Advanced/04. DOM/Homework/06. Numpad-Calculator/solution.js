function solve() {
    const expressionOutput = document.getElementById('expressionOutput');
    const resultOutput = document.getElementById('resultOutput');
    let keys = document.getElementsByClassName('keys')[0].childNodes;
    let num1 = '';
    let num2 = '';
    let operator = null;

    [...keys].forEach(key => key.addEventListener('click', clickHandler));
    document.getElementsByClassName('clear')[0].addEventListener('click', function () {
        resetValues();
        expressionOutput.textContent = null;
        resultOutput.textContent = null;
    });

    function clickHandler(e) {
        handleInput(e.target.value);
    }

    function handleInput(currentChar) {
        if (currentChar === '=') {
            handleResult();
            return;
        }

        if (!isNaN(currentChar) || currentChar === '.') {
            expressionOutput.textContent += currentChar;
            if (!operator) {
                num1 += currentChar;
            } else {
                num2 += currentChar;
            }
        } else {
            expressionOutput.textContent += ` ${currentChar} `;
            operator = currentChar;
        }
    }

    function handleResult() {
        if (!num1 || !num2 || !operator) {
            resultOutput.textContent = 'NaN';
            return;
        }

        const funcObj = {
            '+': (a, b) => a + b,
            '*': (a, b) => a * b,
            '-': (a, b) => a - b,
            '/': (a, b) => a / b,
        };

        resultOutput.textContent = funcObj[operator](Number(num1), Number(num2));
        resetValues();
    }

    function resetValues() {
        num1 = '';
        num2 = '';
        operator = null;
    }
}