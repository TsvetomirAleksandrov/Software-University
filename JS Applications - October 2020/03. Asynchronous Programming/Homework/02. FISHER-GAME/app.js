function attachEvents() {
    const addButton = document.querySelector('button.add');
    const loadButton = document.querySelector('button.load');
    const updateButton = document.querySelector('button.update');
    const deleteButton = document.querySelector('button.delete');

    addButton.addEventListener('click', () => {
        let angler = document.querySelector('fieldset > input.angler');
        let weight = document.querySelector('fieldset > input.weight');
        let species = document.querySelector('fieldset > input.species');
        let location = document.querySelector('fieldset > input.location');
        let bait = document.querySelector('fieldset > input.bait');
        let captureTime = document.querySelector('fieldset > input.captureTime');

        let obj = JSON.stringify({
            angler: angler.value,
            weight: weight.value,
            species: species.value,
            location: location.value,
            bait: bait.value,
            captureTime: captureTime.value
        });

        fetch(baseURL, {
            method: 'POST',
            body: obj,
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    });

    loadButton.addEventListener('click', () => {
        fetch(baseURL)
            .then(response => response.json())
            .then(data => {
                Object.keys(data).forEach(appendCatch);
            });
    })

    function appendCatch(key) {
        let { angler, weight, species, location, bait, captureTime } = data[key];
        let catchDiv = createElement('div', 'catch', '', '');

        let anglerLabel = createElement('label', '', 'Angler');
        let anglerInput = createElement('input', 'angler', angler, 'text');

        let weightLabel = createElement('label', '', 'Weight');
        let weightInput = createElement('input', 'weight', weight, 'number');

        let speciesLabel = createElement('label', '', 'Species');
        let speciesInput = createElement('input', 'species', species, 'text');

        let locationLabel = createElement('label', '', 'Location');
        let locationInput = createElement('input', 'location', location, 'text');

        let baitLabel = createElement('label', '', 'Bait');
        let baitInput = createElement('input', 'bait', bait, 'text');

        let captureTimeLabel = createElement('label', '', 'CaptureTime');
        let captureTimeInput = createElement('input', 'captureTime', captureTime, 'number');

        catchDiv.appendChild(anglerLabel);
        catchDiv.appendChild(anglerInput);

        catchDiv.appendChild(weightLabel);
        catchDiv.appendChild(weightInput);

        catchDiv.appendChild(speciesLabel);
        catchDiv.appendChild(speciesInput);

        catchDiv.appendChild(locationLabel);
        catchDiv.appendChild(locationInput);

        catchDiv.appendChild(baitLabel);
        catchDiv.appendChild(baitInput);

        catchDiv.appendChild(captureTimeLabel);
        catchDiv.appendChild(captureTimeInput);
    }

    function createElement(ele, classes, content, type) {
        let element = document.createElement(ele);

        if (ele === 'input') {
            ele.type = type;
            ele.value = content;
        } else {
            element.innerHTML = content;
        }
        element.className = classes;

        return element;
    }
}

attachEvents();

