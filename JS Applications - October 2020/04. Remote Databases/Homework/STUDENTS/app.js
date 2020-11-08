const htmlSelectors = {
    'loadStudents': () => document.getElementById('loadStudents'),
    'createButton': () => document.querySelector('#create-form > button'),
    'createIdInput': () => document.getElementById('create-id'),
    'createFirstNameInput': () => document.getElementById('create-first-name'),
    'createLastNameInput': () => document.getElementById('create-last-name'),
    'createFacultyNumberInput': () => document.getElementById('create-faculty-number'),
    'createGradeInput': () => document.getElementById('create-grade'),
    'studentsContainer': () => document.getElementsByTagName('tbody')[0],
    'errorContainer': () => document.getElementById('error-notification'),
}

htmlSelectors['loadStudents']()
    .addEventListener('click', fetchAllStudents);
htmlSelectors['createButton']()
    .addEventListener('click', createStudent);

function createStudent(e) {
    e.preventDefault();

    const idInput = htmlSelectors['createIdInput']();
    const firstNameInput = htmlSelectors['createFirstNameInput']();
    const lastNameInput = htmlSelectors['createLastNameInput']();
    const facultyNumberInput = htmlSelectors['createFacultyNumberInput']();
    const gradeInput = htmlSelectors['createGradeInput']();

    if (idInput.value !== '' && firstNameInput.value !== '' && lastNameInput.value !== '' && facultyNumberInput.value !== '' && gradeInput.value !== 0) {
        const initObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: idInput.value,
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                facultyNumber: facultyNumberInput.value,
                grade: gradeInput.value
            })
        };

        fetch(`https://books-app-8cdaa.firebaseio.com/Students/.json`, initObj)
            .then(fetchAllStudents)
            .catch(handleError);

        idInput.value = '';
        firstNameInput.value = '';
        lastNameInput.value = '';
        facultyNumberInput.value = '';
        gradeInput.value = '';
    } else {
        const error = { message: '' };

        if (idInput.value === '') {
            error.message += `Id input must not be empty!`;
        }

        if (firstNameInput.value === '') {
            error.message += `First Name input must not be empty!`;
        }

        if (lastNameInput.value === '') {
            error.message += `Last Name input must not be empty!`;
        }

        if (facultyNumberInput.value === '') {
            error.message += `Faculty Number input must not be empty!`;
        }

        if (gradeInput.value === '') {
            error.message += `Grade input must not be empty!`;
        }

        handleError(error);
    }
}

function fetchAllStudents() {
    fetch(`https://books-app-8cdaa.firebaseio.com/Students/.json`)
        .then(res => res.json())
        .then(renderStudents)
        .catch(handleError);
}

function renderStudents(studentsData) {
    const studentsContainer = htmlSelectors['studentsContainer']();

    if (studentsContainer.innerHTML != '') {
        studentsContainer.innerHTML = '';
    }

    Object
        .keys(studentsData)
        .forEach(studentId => {
            const { id, firstName, lastName, facultyNumber, grade } = studentsData[studentId];

            const tableRow = createDOMElement('tr', '', {}, {},
                createDOMElement('td', id, {}, {}),
                createDOMElement('td', firstName, {}, {}),
                createDOMElement('td', lastName, {}, {}),
                createDOMElement('td', facultyNumber, {}, {}),
                createDOMElement('td', grade, {}, {}));

            studentsContainer.appendChild(tableRow);
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