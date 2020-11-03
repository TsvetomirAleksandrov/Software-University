function solve() {
    //bus has two states - moving and stopped
    //when its stopped, only the button 'Depart' is enabled
    //when its moving, only the button 'Arrive' is enabled while the info shows the info of the upcoming stop
    //info box show 'Not connected'and 'Arrive button' is disabled
    //the id of first stop is ''depot''

    let currentState = 'stopped';
    let stopID = 'depot';
    let nextStopName = '';
    let nextStopID = '';
    let infoBox = document.getElementById('info').children[0];
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');

    function toggleButtons() {
        departBtn.disabled = !departBtn.disabled;
        arriveBtn.disabled = !arriveBtn.disabled;
    }

    function depart() {
        currentState = 'moving';
        toggleButtons();
        sendRequest();
    }

    function arrive() {
        currentState = 'stopped';
        toggleButtons();
        infoBox.textContent = `Arriviing at ${nextStopName}`;
    }

    function sendRequest() {
        let url = `https://judgetests.firebaseio.com/schedule/${stopID}.json`;
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
        nextStopID = data.next;

        if (currentState === 'moving') {
            infoBox.textContent = `Next stop ${nextStopName}`;
        }
        stopID = nextStopID;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();