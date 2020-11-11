import monkeys from './monkeys.js';

window.addEventListener('load', async () => {
    const mainElement = document.querySelector('section');

    const mainString = await (await fetch('monkeys-template.hbs')).text();
    const mainTemplate = Handlebars.compile(mainString);
    Handlebars.registerPartial('monkey', await (await fetch('./monkey.hbs')).text());


    const html = mainTemplate({ monkeys });
    mainElement.innerHTML = html;

    const monkeysElement = document.querySelector('.monkeys');
    monkeysElement.addEventListener('click', onClick);

    function onClick(e) {
        if (e.target.tagName !== 'BUTTON') {
            return;
        }
        const div = e.target.parentNode.querySelector('p');
        div.removeAttribute('style');
    }
})




