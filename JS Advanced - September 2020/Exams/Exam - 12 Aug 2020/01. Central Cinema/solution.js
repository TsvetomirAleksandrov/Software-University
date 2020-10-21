function solve() {
    const inputs = document.querySelectorAll('#container > input');
    const onScreenBtn = document.querySelector('#container > button');
 
    const moviesOnScreensUl = document.querySelector('#movies > ul');
    const archiveSection = document.querySelector('#archive > ul');
 
    const clearBtn = document.querySelector('#archive > button');
 
    onScreenBtn.addEventListener('click', addMovie);
 
    function addMovie(e) {
        e.preventDefault();
 
        const movie = {
            name: inputs[0].value,
            hall: inputs[1].value,
            ticketPrice: Number(inputs[2].value)
        }
 
        if (!movie.name || !movie.hall || !movie.ticketPrice) {
            return;
        }
 
        const li = el('li');
 
        const movieNameEl = el('span', movie.name);
        const hallEl = el('strong', `Hall: ${movie.hall}`);
        const divEl = el('div');
 
        const priceEl = el('strong', movie.ticketPrice.toFixed(2));
        
        const inputEl = el('input');
        inputEl.placeholder = "Tickets Sold";
 
        const archiveBtn = el('button', 'Archive');
 
        divEl.appendChild(priceEl);
        divEl.appendChild(inputEl);
        divEl.appendChild(archiveBtn);
 
        archiveBtn.addEventListener('click', archiveMovie);
 
        li.appendChild(movieNameEl);
        li.appendChild(hallEl);
        li.appendChild(divEl);
 
        moviesOnScreensUl.appendChild(li);
 
        inputs[0].value = '';
        inputs[1].value = '';
        inputs[2].value = '';
 
        function archiveMovie(e) {
            let qtty = e.target.previousElementSibling;
            if (!Number(qtty.value)) {
                return;
            }
 
            const liEl = el('li');
            const movieName = el('span', movie.name);
            const strongEl = el('strong', `Total amount: ${(Number(qtty.value) * movie.ticketPrice).toFixed(2)}`);
            const deleteBtn = el('button', 'Delete');
 
            liEl.appendChild(movieName);
            liEl.appendChild(strongEl);
            liEl.appendChild(deleteBtn);
 
            archiveSection.appendChild(liEl);
            e.target.parentNode.parentNode.remove();
 
            deleteBtn.addEventListener('click', function (ev) {
                ev.target.parentNode.remove();
            });
        };
    };
 
    clearBtn.addEventListener('click', function (e) {
        e.target.previousElementSibling.textContent = '';
    });
 
    function el(type, content, className) {
        let result = document.createElement(type);
 
        if (content) {
            result.textContent = content;
        }
 
        if (className) {
            result.className = className;
        }
 
        return result;
    }
}