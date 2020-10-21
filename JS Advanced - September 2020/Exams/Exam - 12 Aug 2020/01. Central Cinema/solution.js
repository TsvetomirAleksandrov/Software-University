function solve() {
    const inputs = Array.from(document.querySelectorAll('#container input'));
    let [movieName, movieHall, ticketPrice] = inputs;
    const onScreenButton = document.querySelector('#container button');

    const onScreenMoviesUlElement = document.querySelector('#movies ul');
    const archiveUlElement = document.querySelector('#archive ul');

    const archiveClearButton = document.querySelector('#archive button');

    onScreenButton.addEventListener('click', addMovie);

    function addMovie(e) {
        e.preventDefault();

        const movie = {
            name: movieName.value,
            hall: movieHall.value,
            ticketPrice: Number(ticketPrice.value)
        }

        if (!inputs.every(x => x.value)) {
            return;
        }

        if (!Number(ticketPrice.value)) {
            return;
        }

        const liElement = el('li');

        const movieNameElement = el('span', movie.name);
        const hallElement = el('strong', `Hall: ${movie.hall}`);
        const divElement = el('div');

        const priceElement = el('strong', movie.ticketPrice.toFixed(2));

        const inputElement = el('input');
        inputElement.setAttribute('placeholder', 'Tickets Sold');

        const archiveButton = el('button', 'Archive');


        divElement.appendChild(priceElement);
        divElement.appendChild(inputElement);
        divElement.appendChild(archiveButton);


        archiveButton.addEventListener('click', archiveMovie);

        liElement.appendChild(movieNameElement);
        liElement.appendChild(hallElement);
        liElement.appendChild(divElement);


        onScreenMoviesUlElement.appendChild(liElement);

        movieName.value = '';
        movieHall.value = '';
        ticketPrice.value = '';

        function archiveMovie(e) {
            let ticketQuantity = e.target.previousElementSibling;

            if (!Number(ticketQuantity.value)) {
                return;
            }

            const archiveLiElement = el('li');

            const archiveMovieName = el('span', movie.name);

            const archiveTotalAmountElement = el('strong', `Total amount: ${(Number(ticketQuantity.value) * movie.ticketPrice).toFixed(2)}`);

            const archiveDeleteButton = el('button', 'Delete');

            archiveLiElement.appendChild(archiveMovieName);
            archiveLiElement.appendChild(archiveTotalAmountElement);
            archiveLiElement.appendChild(archiveDeleteButton);


            archiveUlElement.appendChild(archiveLiElement);
            e.target.parentNode.parentNode.remove();

            archiveDeleteButton.addEventListener('click', e => {
                e.target.parentNode.remove();
            });
        };
    };

    archiveClearButton.addEventListener('click', e => {
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