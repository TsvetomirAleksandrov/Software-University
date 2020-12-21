function getInfo() {
    let stopName = document.getElementById('stopName');
    let busesUl = document.getElementById('buses');
    let stopID = document.getElementById('stopId').value;

    fetch(`https://judgetests.firebaseio.com/businfo/${stopID}.json`)
        .then(response => {
            if (response.status !== 200) {
                throw new Error(`Bad Request!`);
            }
            return response.json();
        })
        .then(jsonData => displayData(jsonData))
        .catch(err => displayError(err))

    function displayError(err) {
        busesUl.textContent = '';
        stopName.textContent = 'Error!'
    }

    function displayData(jsonData) {
        busesUl.textContent = '';
        stopName.textContent = jsonData.name;

        for (const bus in jsonData.buses) {
            let liElement = document.createElement('li');
            liElement.textContent = `Bus ${bus} arrives in ${jsonData.buses[bus]} minutes`;
            busesUl.appendChild(liElement);
        }
    }
}



