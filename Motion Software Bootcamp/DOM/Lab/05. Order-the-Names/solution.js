function solve() {
    document.getElementsByTagName('button')[0].addEventListener('click', function () {

        let studentName = document.getElementsByTagName('input')[0].value;

        if (studentName) {
            addStudent(studentName);
        }
    });

    function addStudent(studentName) {
        const liElements = document.getElementsByTagName('ol')[0].getElementsByTagName('li');
        const studentLetterIndex = studentName.toUpperCase().charCodeAt(0) - 65;

        const currentLiElement = liElements[studentLetterIndex];
        studentName = studentName[0].toUpperCase() + studentName.slice(1).toLocaleLowerCase();

        let currentLiElementText = currentLiElement.textContent;
        if (currentLiElementText) {
            currentLiElementText += ', ' + studentName;
        } else {
            currentLiElementText = studentName;
        }

        currentLiElement.textContent = currentLiElementText;

        document.getElementsByTagName('input')[0].value == null;
    }
}