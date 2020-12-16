function addItem() {
    let textInput = document.getElementById('newItemText');
    let valueInput = document.getElementById('newItemValue');
    let dropdownMenu = document.getElementById('menu');

    let optionElement = document.createElement('option');

    optionElement.textContent = textInput.value;
    optionElement.value = valueInput.value;
    dropdownMenu.appendChild(optionElement);

    textInput.value = '';
    valueInput.value = '';
}