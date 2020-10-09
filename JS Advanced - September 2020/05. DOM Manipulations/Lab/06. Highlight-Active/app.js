function focus() {
    let parentDiv = document.getElementsByTagName('div')[0];
    parentDiv.addEventListener('focus', onfocus, true);
    parentDiv.addEventListener('blur', blur, true);

    function onfocus(e) {
        e.target.parentNode.classList.add('focused');
    }

    function blur(e) {
        e.target.parentNode.classList.remove('focused');
    }
}