function solve() {
    const inputs = Array.from(document.querySelectorAll('#container input'));

    const addButonElement = document.querySelector('#container button');
    const adoptionUlElement = document.querySelector('#adoption ul');
    const adoptedUlElement = document.querySelector('#adopted ul');

    addButonElement.addEventListener('click', addPetToAdoptionElement);

    function addPetToAdoptionElement(e) {
        e.preventDefault();

        const pet = {
            name: inputs[0].value,
            age: inputs[1].value,
            kind: inputs[2].value,
            currentOwner: inputs[3].value,
        }

        if (!inputs.every(x => x.value)) {
            return;
        }

        if (!Number(pet.age)) {
            return;
        }

        //Create list item
        const liElement = el('li');

        const pElement = el('p');
        pElement.innerHTML = `<strong>${pet.name}</strong> is a <strong>${pet.age}</strong> year old <strong>${pet.kind}</strong>`;
        const ownerSpanElement = el('span', `Owner: ${pet.currentOwner}`);
        const contactOwnerButton = el('button', 'Contact with owner');

        liElement.appendChild(pElement);
        liElement.appendChild(ownerSpanElement);
        liElement.appendChild(contactOwnerButton);

        //Add liElement to #adoption
        adoptionUlElement.appendChild(liElement);

        //Clear all input fields
        inputs[0].value = '';
        inputs[1].value = '';
        inputs[2].value = '';
        inputs[3].value = '';

        //Attach event handler
        contactOwnerButton.addEventListener('click', contactOwnerButtonClick);
    }

    function contactOwnerButtonClick(e) {
        let liElement = e.currentTarget.parentElement;
      
        e.currentTarget.remove();

        let divElement = el('div');

        let inputElement = el('input');
        inputElement.setAttribute('placeholder', 'Enter your names');

        let takeItButtonElement = el('button', 'Yes! I take it!');

        divElement.appendChild(inputElement);
        divElement.appendChild(takeItButtonElement);

        liElement.appendChild(divElement);

        
        takeItButtonElement.addEventListener('click', takeItButtonClick);
    }

    function takeItButtonClick(e) {
        let parentButtonElement = e.currentTarget.parentElement;
        let liElement = parentButtonElement.parentElement;

        let newOwnerInputElement = liElement.querySelector('input');
        let ownerNameSpanElement = liElement.querySelector('span');

        let newOwnerName = newOwnerInputElement.value;

        if (!newOwnerName) {
            return;
        }

        ownerNameSpanElement.textContent = `New Owner: ${newOwnerName}`;

        adoptedUlElement.appendChild(liElement);

        parentButtonElement.remove();

        let checkedButtonElement = el('button', 'Checked');

        liElement.appendChild(checkedButtonElement);

        checkedButtonElement.addEventListener('click', e => {
            e.currentTarget.parentElement.remove();
        });
    }

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

