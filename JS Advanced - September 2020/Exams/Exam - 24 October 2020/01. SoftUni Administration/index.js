function solve() {
    let sections = document.querySelectorAll('section');
    let lectureNameElement = document.querySelector('input[name="lecture-name"]');
    let dateInputElement = document.querySelector('input[name="lecture-date"]');
    let moduleInputElement = document.querySelector('select[name="lecture-module"]');
    let newModule = moduleInputElement.value;
    let trainingsSectionDiv = sections.item(0).querySelector('div');

    let addButton = document.querySelector('.form-control button');

    addButton.addEventListener('click', addTraining);

    function addTraining(e) {
        e.preventDefault();

        let lecture = {
            trainingName: lectureNameElement.value,
            trainingDate: dateInputElement.value,
            trainingModule: moduleInputElement.value
        }



        if (lecture.trainingName.length > 0 && lecture.trainingDate.length > 0 && lecture.trainingModule !== 'Select module') {
            let moduleTitle = document.createElement('h3');

            moduleTitle.textContent = `${lecture.trainingModule.toUpperCase()}-MODULE`;

            let moduleDiv = document.createElement('div');
            moduleDiv.setAttribute('class', 'module');

            let moduleUl = document.createElement('ul');

            let moduleLiElement = document.createElement('li')

            moduleLiElement.setAttribute('class', 'flex');

            let moduleH4 = document.createElement('h4')
            moduleH4.textContent = `${lecture.trainingName} - ${lecture.trainingDate}`;

            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Del';
            deleteButton.setAttribute('class', 'red');

            moduleLiElement.appendChild(moduleH4);
            moduleLiElement.appendChild(deleteButton);

            deleteButton.addEventListener('click', (e) => {
                if (moduleUl.childNodes.length === 1) {
                    e.currentTarget.parentElement.parentElement.parentElement.firstChild.remove();
                    e.currentTarget.parentElement.remove();
                } else {
                    e.currentTarget.parentElement.remove();
                }
            });

            moduleDiv.appendChild(moduleTitle);
            moduleUl.appendChild(moduleLiElement);
            moduleDiv.appendChild(moduleUl);
            trainingsSectionDiv.appendChild(moduleDiv);
        }
    }
};