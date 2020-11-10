(() => {
    let outputSection = document.getElementById('allCats');

    async function renderCatTemplate() {
        let html = await (await fetch('./cat-template.hbs')).text();
        let template = Handlebars.compile(html);
        outputSection.innerHTML = template({ cats });
    }

    function catStatusBtn() {
        outputSection.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                if (e.target.parentNode.children[1].style.display === 'none') {
                    e.target.parentNode.children[1].style.display = 'block';
                    e.target.textContent = 'Hide status code';
                } else {
                    e.target.parentNode.children[1].style.display = 'none';
                    e.target.textContent = 'Show status code';
                }
            }
        });
    }
    catStatusBtn();
    renderCatTemplate();
})();