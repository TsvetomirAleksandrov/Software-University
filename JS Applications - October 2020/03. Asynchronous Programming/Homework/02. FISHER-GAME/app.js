function attachEvents() {
    let catchesSection = document.getElementById('catches');
    catchesSection.innerHTML = '';
    let asideSection = document.getElementsByTagName('aside')[0];

    catchesSection.addEventListener('click', updateDelete);
    asideSection.addEventListener('click', loadAdd);

    function updateDelete(e) {
        let catchId = e.target.parentNode.getAttribute('data-id');
        let buttons = {
            'Update': () => sendRequest(
                `https://fisher-game.firebaseio.com/catches/${catchId}.json`, 'PUT',
                JSON.stringify(getBody(e.target.parentNode))),

            'Delete': () => sendRequest(`https://fisher-game.firebaseio.com/catches/${catchId}.json`, 'DELETE')
        };
        if (e.target.textContent === 'Update')
            buttons['Update']();
        else if (e.target.textContent === 'Delete') {
            buttons['Delete']();
            e.target.parentNode.remove();
        }
    }
    async function loadAdd(e) {
        let buttons = {
            'Add': () => sendRequest('https://fisher-game.firebaseio.com/catches.json', 'POST',
                JSON.stringify(getBody(e.target.parentNode))
            ),
            'Load': () => sendRequest(`https://fisher-game.firebaseio.com/catches.json`, 'GET')
        };
        if (e.target.textContent === 'Add') {
            buttons['Add']();
        } else if (e.target.textContent === 'Load') {
            catchesSection.innerHTML = '';
            let data = await buttons['Load']();
            for (const key in data) {
                data[key].catchId = key;
                console.log(data[key]);
                generateCatchHTML(data[key]);
            }
        }
    }

    async function sendRequest(url, method, body) {
        let objRequest = {
            method,
            body
        }
        if (body === undefined) {
            delete objRequest.body;
        }
        try {
            let response = await fetch(url, objRequest);
            if (response.status !== 200) {
                throw (response);
            }
            if (method !== 'PUT')
                return response.json();
        } catch (error) {
        }
    }

    function getBody(node) {
        return {
            angler: node.getElementsByClassName('angler')[0].value,
            weight: node.getElementsByClassName('weight')[0].value,
            species: node.getElementsByClassName('species')[0].value,
            location: node.getElementsByClassName('location')[0].value,
            bait: node.getElementsByClassName('bait')[0].value,
            captureTime: node.getElementsByClassName('captureTime')[0].value
        }
    }

    function generateCatchHTML({ catchId, angler, weight, species, location, bait, captureTime }) {
        let newCatch =
            `<div class="catch" data-id="${catchId}">` +
            `<label>Angler</label>` +
            `<input type="text" class="angler" value="${angler}" />` +
            `<hr>` +
            `<label>Weight</label>` +
            `<input type="number" class="weight" value="${weight}">` +
            `<hr>` +
            `<label>Species</label>` +
            `<input type="text" class="species" value="${species}">` +
            `<hr>` +
            `<label>Location</label>` +
            `<input type="text" class="location" value="${location}">` +
            `<hr>` +
            `<label>Bait</label>` +
            `<input type="text" class="bait" value="${bait}">` +
            `<hr>` +
            `<label>Capture Time</label>` +
            `<input type="number" class="captureTime" value="${captureTime}">` +
            `<hr>` +
            `<button class="update">Update</button>` +
            `<button class="delete">Delete</button>` +
            `</div>`;
        catchesSection.innerHTML += newCatch;
    }
}

attachEvents();