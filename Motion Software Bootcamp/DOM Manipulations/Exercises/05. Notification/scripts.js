function notify(message) {
    let divElement = document.getElementById('notification');
    show(divElement, message);
    hide(divElement);

    function show(element, msg) {
        element.textContent = `${msg}`;
        element.style.display = 'block';
    }
    function hide(element) {
        setTimeout(function () { element.style.display = 'none'; }, 2000);
    }
}