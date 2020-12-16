function addItem() {
    let ulElement = document.getElementById('items');
    let input = document.getElementById('newText');
    let liElement = document.createElement('li');

    if (input.value !== '') {
        liElement.innerHTML = `${input.value} <a href='#'>[Delete]</a>`;
        ulElement.appendChild(liElement);
        ulElement.addEventListener('click', deleteItem);
    }

    input.value = '';

    function deleteItem(e) {
        e.target.parentNode.remove();
    }
}