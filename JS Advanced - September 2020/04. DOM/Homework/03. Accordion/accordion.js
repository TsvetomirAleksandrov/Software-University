function toggle() {
    let button = document.getElementsByClassName('button')[0];
    button.textContent = button.textContent === 'More' ? 'Less' : 'More';

    const paragraph = document.getElementById('extra');
    paragraph.style.display = paragraph.style.display === 'none' || !paragraph.style.display ? 'block' : 'none';
}