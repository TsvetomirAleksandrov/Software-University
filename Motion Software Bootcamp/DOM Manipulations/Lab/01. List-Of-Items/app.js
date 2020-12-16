let ulElement = document.getElementById('items');
let input = document.querySelectorAll('input')[0];
let addBtn = document.querySelectorAll('input')[1];

addBtn.addEventListener('click', addItem);

function addItem() {
    let liElement = document.createElement('li');

    if (input.value !== '') {
        liElement.innerHTML = input.value;
        ulElement.appendChild(liElement);
    }

    input.value = '';
}

