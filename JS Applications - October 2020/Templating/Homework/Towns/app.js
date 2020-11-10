let elements = {
    LoadBtn: document.getElementById('btnLoadTowns'),
    inputTowns: document.getElementById('towns'),
    outputSection: document.getElementById('root')
}

elements.LoadBtn.addEventListener('click', loadTowns);

async function loadTowns() {
    let towns = elements.inputTowns.value.split(', ').map(town => {
        return { name: town }
    });
    let html = await (await fetch('./ul-template.hbs')).text();
    let template = Handlebars.compile(html);
    elements.outputSection.innerHTML = template({ towns });
}