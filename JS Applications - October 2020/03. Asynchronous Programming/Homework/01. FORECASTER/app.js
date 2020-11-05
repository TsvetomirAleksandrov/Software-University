function attachEvents() {

    let weatherButton = document.getElementById('submit');
    let locationName = document.getElementById('location');

    const locationsURL = 'https://judgetests.firebaseio.com/locations.json'



    weatherButton.addEventListener('click', () => {
        fetch(locationsURL)
            .then(response => response.json())
            .then(data => {
                let { name, code } = data.find(c => c.name === locationName.value);

                let current = fetch(`https://judgetests.firebaseio.com/forecast/today/${code}.json`)
                    .then(response => response.json());

                let upcoming = fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`)
                    .then(response => response.json());

                Promise.all([current, upcoming])
                    .then(([currentData, upcomingData]) => {
                        console.log(currentData);
                        console.log(upcomingData);
                    });
            })
    })
}

attachEvents();