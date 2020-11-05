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



    })
}

attachEvents();

