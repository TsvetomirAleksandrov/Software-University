function attachEvents() {

    let weatherButton = document.getElementById('submit');
    let locationName = document.getElementById('location');
    let currentDiv = document.getElementById('current');
    let forecastParentDiv = document.getElementById('forecast');

    const locationsURL = 'https://judgetests.firebaseio.com/locations.json'

    const symbols = {
        'Sunny': '&#x2600',           // ☀
        'Partly sunny': '&#x26C5',    // ⛅
        'Overcast': '&#x2601',        // ☁
        'Rain': '&#x2614',            // ☂
        'degrees': '&#176',           // °
    };


    weatherButton.addEventListener('click', () => {
        fetch(locationsURL)
            .then(response => response.json())
            .then(data => {
                let { name, code } = data.find((city) => city.name === locationName.value);

                let current = fetch(`https://judgetests.firebaseio.com/forecast/today/${code}.json`)
                    .then(response => response.json());

                let upcoming = fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`)
                    .then(response => response.json());

                Promise.all([current, upcoming])
                    .then(([currentData, upcomingData]) => {

                        let forecastDiv = createElement('div', 'forecasts', '');
                        let currentSymbol = symbols[currentData.forecast.condition];

                        let conditionSymbolSpan = createElement('span', 'condition symbol', currentSymbol);
                        let conditionInfoSpan = createElement('span', 'condition', '');

                        let forecastCitySpan = createElement('span', 'forecast-data', currentData.name);

                        let highLow = `${currentData.forecast.low}${symbols.degrees}/${currentData.forecast.high}${symbols.degrees}`;
                        let forecastInfoSpan = createElement('span', 'forecast-data', highLow);

                        let forecastConditionSpan = createElement('span', 'forecast-data', currentData.forecast.condition);


                        forecastDiv.appendChild(conditionSymbolSpan);
                        currentDiv.appendChild(forecastDiv);
                        conditionInfoSpan.appendChild(forecastCitySpan);
                        conditionInfoSpan.appendChild(forecastInfoSpan);
                        conditionInfoSpan.appendChild(forecastConditionSpan);
                        forecastDiv.appendChild(conditionInfoSpan);

                        forecastParentDiv.style.display = 'block';

                    });
            });
    })


    function createElement(ele, classes, content) {
        let element = document.createElement(ele);
        element.className = classes;
        element.innerHTML = content;

        return element;
    }
}

attachEvents();