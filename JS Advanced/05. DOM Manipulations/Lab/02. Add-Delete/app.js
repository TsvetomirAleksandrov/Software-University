function addItem() {
    let list = document.getElementById('items');
    list.addEventListener('click', deleteItem);

    let newLiElement = document.createElement('li');
    newLiElement.innerHTML = `${document.getElementById('newText').value} <a href = "#">[Delete]</a>`;
    document.getElementById('items').appendChild(newLiElement);
    document.getElementById('newText').value = '';

    function deleteItem(e) {
        e.target.parentNode.remove();
    }
}