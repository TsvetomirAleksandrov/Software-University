async function getSwName(id) {
    let response = await fetch('url');
    let character = await response.json();

    let starShipResponse = await fetch(character.starships[0]);
    let starship = await starShipResponse.json();

    return `${character.name} - ${starship.name}`;
}

getSwName(1)
.then