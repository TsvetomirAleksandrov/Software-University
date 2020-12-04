function getInfo() {
    let stopName = document.getElementById('stopName');
    let busesUL = document.getElementById('buses');
    let stopID = document.getElementById('stopId').value;

    fetch(`https://judgetests.firebaseio.com/businfo/${stopID}.json`)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Request error');
            }

            return response.json();
        })
        .then(dataJSON => displayData(dataJSON))
        .catch(err => displayError(err));


    function displayData(dataJSON) {
        busesUL.textContent = '';
        stopName.textContent = dataJSON.name;
        for (const key in dataJSON.buses) {
            let li = document.createElement('li');
            li.textContent = `Bus ${key} arrives in ${dataJSON.buses[key]} minutes`;
            busesUL.appendChild(li);
        }
    }

    function displayError(err) {
        busesUL.textContent = '';
        stopName.textContent = 'Error';
    }
}