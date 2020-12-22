function solve() {
    let currentState = 'stopped';
    let stopId = 'depot';
    let nextStopName = '';
    let nextStopId = '';
    let infoBox = document.getElementById('info').children[0];
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');

    function toggleButtons() {
        departBtn.disabled = !departBtn.disabled;
        arriveBtn.disabled = !arriveBtn.disabled;
    }

    function depart() {
        currentState = 'moving'
        toggleButtons();
        sendRequest();
    }

    function arrive() {
        currentState = 'stopped'
        toggleButtons();
        infoBox.textContent = `Arriving at ${nextStopName}`;
    }

    function sendRequest() {
        let url = `https://judgetests.firebaseio.com/schedule/${stopId}.json`;
        fetch(url)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Request error');
                }

                return response.json();
            })
            .then((data) => dataHandler(data))
            .catch(() => {
                infoBox.textContent = 'Error';
                departBtn.disabled = true;
                arriveBtn.disabled = true;
            });
    }

    function dataHandler(data) {
        nextStopName = data.name;
        nextStopId = data.next;

        if (currentState === 'moving') {
            infoBox.textContent = `Next stop ${nextStopName}`;
        }
        stopId = nextStopId;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();