function attachEvents() {
    let submitBtn = document.getElementById('submit');
    let refreshBtn = document.getElementById('refresh');
    let output = document.getElementById('messages');
    let url = `https://rest-messanger.firebaseio.com/messanger.json`;

    submitBtn.addEventListener('click', function () {
        let data = {
            author: document.getElementById('author').value,
            content: document.getElementById('content').value
        }
        if (data.author.length > 0 && dadta.author.length > 0) {
            document.getElementById('author').value = '';
            document.getElementById('content').value = '';
            sendRequest(url, 'POST', data);
        }
    });

    refreshBtn.addEventListener('click', function () {
        output.value = '';
        document.getElementById('author').value = '';
        document.getElementById('content').value = '';
        sendRequest(url, 'GET');
    });

    function sendRequest(url, method, data) {
        let obj = {
            method,
            body: JSON.stringify(data)
        }

        if (data === undefined) {
            delete obj.body;
        }

        fetch(url, obj)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Something went wrong');
                }
                return response.json();
            })
            .then((data) => dataHandler(data, method))
            .catch((err) => console.log(err));
    }

    function dataHandler(data, method) {
        if (method === 'GET') {
            for (const key in data) {
                output.value += `${data[key].author}: ${data[key].content}\n`
            }
        }
    }
}

attachEvents();