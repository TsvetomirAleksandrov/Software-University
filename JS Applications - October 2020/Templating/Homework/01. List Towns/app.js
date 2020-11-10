window.addEventListener('load', () => {
    document.querySelector('#btnLoadTowns').addEventListener('click', renderTowns);
    const input = document.querySelector('#towns');
    const rootElement = document.querySelector('#root');

    function renderTowns(e) {
        e.preventDefault();

        const towns = input.value.split(', ');

        const templateString = document.getElementById('main-template').innerHTML;
        const templateFn = Handlebars.compile(templateString);
        const generatedHtml = templateFn({ towns });

        rootElement.innerHTML = generatedHtml;
    }
});