window.addEventListener('load', () => {
    const templateString = document.getElementById('main-template').innerHTML;
    Handlebars.registerPartial('town', document.getElementById('town-template').innerHTML);
    
    
    document.querySelector('#btnLoadTowns').addEventListener('click', renderTowns);
    const input = document.querySelector('#towns');
    const rootElement = document.querySelector('#root');

    function renderTowns(e) {
        e.preventDefault();
        const towns = input.value.split(', ');

        const templateFn = Handlebars.compile(templateString);
        const generatedHtml = templateFn({ towns });

        rootElement.innerHTML = generatedHtml;
    }
});