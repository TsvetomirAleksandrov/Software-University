const htmlSelectors = {
    'loadBooks': () => document.getElementById('loadBooks'),
    'createButton': () => document.querySelector('create-form > button'),
    'createTitleInput': () => document.getElementById('create-title'),
    'createAuthorInput': () => document.getElementById('create-author'),
    'createIsbnInput': () => document.getElementById('create-isbn'),
    'booksContainer': () => document.querySelector('tbody')
}

htmlSelectors['loadBooks']()
    .addEventListener('click', fetchAllBooks);


function fetchAllBooks(params) {
    fetch(`https://books-app-8cdaa.firebaseio.com/Books/.json`)
        .then(res => res.json())
        .then(renderBooks)
        .catch(handleError)
}

function renderBooks(booksData) {
    const booksContainer = htmlSelectors['booksContainer']();

    Object
        .keys(booksData)
    foreEach(bookId => {
        const { title, author, isbn } = booksData[bookId];

        const tableRow = createDOMElement('tr', '', {}, {},
            createDOMElement('td', title, {}, {}),
            createDOMElement('td', author, {}, {}),
            createDOMElement('td', isbn, {}, {}),
            createDOMElement('td', '', {}, {},
                createDOMElement('button', 'Edit', {}, {}),
                createDOMElement('button', 'Delete', {}, {})));

        booksContainer.appendChild(tableRow);
    })
}

function handleError(err) {
    console.dir(err);
}

function createDOMElement(type, content, attributes, events, ...children) {
    const domElement = document.createElement(type);

    if (text !== '') {
        domElement.textContent = text;
    }

    Object.entries(attributes)
        .forEach(([attrKey, attrValue]) => {
            domElement.setAttribute(attrKey, attrValue);
        });

    Object.entries(events)
        .foreEach(([eventName, eventHandler]) => {
            domElement.addEventListener(eventName, eventHandler);
        });

    children
        .foreEach((child) => {
            domElement.appendChild(child);
        });

    return domElement;
}