const htmlSelectors = {
    'loadBooks': () => document.getElementById('loadBooks'),
    'createButton': () => document.querySelector('create-form > button'),
    'createTitleInput': () => document.getElementById('create-title'),
    'createAuthorInput': () => document.getElementById('create-author'),
    'createIsbnInput': () => document.getElementById('create-isbn'),
    'booksContainer': () => document.querySelector('table > tbody'),
    'errorContainer': () => document.getElementById('error-notification')
}

htmlSelectors['loadBooks']()
    .addEventListener('click', fetchAllBooks);


function fetchAllBooks() {
    fetch(`https://books-app-8cdaa.firebaseio.com/Book/.json`)
        .then(res => res.json())
        .then(renderBooks)
        .catch(handleError)
}

function renderBooks(booksData) {
    const booksContainer = htmlSelectors['booksContainer']();

    if (booksContainer.innerHTML != '') {
        booksContainer.innerHTML = '';
    }

    Object
        .keys(booksData)
        .forEach(bookId => {
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
    const errorContainer = htmlSelectors['errorContainer']();
    errorContainer.style.display = 'block';
    errorContainer.textContent = err.message;

    setTimeout(() => {
        errorContainer.style.display = 'none';
    }, 5000);
}

function createDOMElement(type, content, attributes, events, ...children) {
    const domElement = document.createElement(type);

    if (content !== '') {
        domElement.textContent = content;
    }

    Object.entries(attributes)
        .forEach(([attrKey, attrValue]) => {
            domElement.setAttribute(attrKey, attrValue);
        });

    Object.entries(events)
        .forEach(([eventName, eventHandler]) => {
            domElement.addEventListener(eventName, eventHandler);
        });

    children
        .forEach((child) => {
            domElement.appendChild(child);
        });

    return domElement;
}