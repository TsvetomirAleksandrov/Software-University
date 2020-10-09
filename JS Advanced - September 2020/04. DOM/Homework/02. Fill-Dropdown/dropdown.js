function addItem() {
    let textElement = document.getElementById('newItemText').value;
    let valueElement = document.getElementById('newItemValue').value;

    let newOption = document.createElement('option');
    newOption.text = textElement;
    newOption.value = valueElement;

    const selectMenu = document.getElementById('menu');
    selectMenu.appendChild(newOption);

    document.getElementById('newItemText').value = '';
    document.getElementById('newItemValue').value = '';
}