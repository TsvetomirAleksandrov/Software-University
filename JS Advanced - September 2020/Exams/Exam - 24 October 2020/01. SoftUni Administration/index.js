function solve() {
    let lectureName = document.getElementsByTagName('input')[0];
    let dateTime = document.getElementsByTagName('input')[1];
    let module = document.getElementsByTagName('select')[0];
    let trainingsDiv = document.getElementsByClassName('modules')[0];

    document.getElementsByTagName('button')[0].addEventListener('click', function (e) {
        e.preventDefault();

        let lecturesArray = Array.from(document.querySelectorAll('.module h3'));
        let existingLecture = lecturesArray.find(l => l.textContent === `${module.value.toUpperCase()}-MODULE`);
        let ul;

        let date = dateTime.value.split('T')[0].split('-').join('/');
        let time = dateTime.value.split('T')[1];

        if (lectureName.value !== '' && dateTime.value !== '' && module.value !== 'Select module') {
            let title = createEl('h3', `${module.value.toUpperCase()}-MODULE`);
            let moduleDiv = createEl('div', title, { className: 'module' });

            let moduleUl = createEl('ul', []);
            let h4 = createEl('h4', `${lectureName.value} - ${date} - ${time}`)
            let deleteBtn = createEl('button', 'Del', { className: 'red' });

            let moduleLi = createEl('li', [h4, deleteBtn], { className: 'flex' });

            if (existingLecture === undefined) {
                moduleUl.appendChild(moduleLi);
                moduleDiv.appendChild(moduleUl);
                trainingsDiv.appendChild(moduleDiv);
                ul = moduleUl;
            } else {
                ul = document.querySelector('ul');
                ul.appendChild(moduleLi);
                sortList(ul);
            }

            lectureName.value = '', dateTime.value = '';

            deleteBtn.addEventListener('click', function (e) {
                ul.removeChild(moduleLi);
                if (ul.textContent == '') {
                    document.querySelector('.module').remove();
                }
            })
        }
    })


    function sortList(ul) {
        let sorted = Array.from(ul.getElementsByTagName("li")).sort((a, b) =>
            a.children[0].innerText.split(' - ')[1].localeCompare(b.children[0].innerText.split(' - ')[1])
        );

        sorted.forEach((li) => ul.appendChild(li));
    }

    function createEl(type, content, attributes) {
        const result = document.createElement(type);

        if (attributes !== undefined) {
            Object.assign(result, attributes);
        }

        if (Array.isArray(content)) {
            content.forEach(append);
        } else {
            append(content);
        }

        function append(node) {
            if (typeof node === 'string') {
                node = document.createTextNode(node);
            }

            result.appendChild(node);
        }

        return result;
    }
};