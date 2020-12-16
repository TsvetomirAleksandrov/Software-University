function toggle() {
    let buttonElement = document.getElementsByClassName('button')[0];
    let extraText = document.getElementById('extra');

    buttonElement.textContent = buttonElement.textContent === 'More' ? 'Less' : 'More';
    extraText.style.display = extraText.style.display === 'none' || !extraText.style.display ? 'block' : 'none';
}
