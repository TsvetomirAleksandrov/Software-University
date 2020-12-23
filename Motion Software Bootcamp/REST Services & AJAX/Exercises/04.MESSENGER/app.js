function attachEvents() {
    let textArea = document.getElementById('messages');
    let btnSend = document.getElementById('submit');
    let btnRefresh = document.getElementById('refresh');
    let url = `https://rest-messanger.firebaseio.com/messanger.json`;

    btnRefresh.addEventListener('click', function () {
        textArea.value = '';
        document.getElementById('author').value = '';
        document.getElementById('content').value = '';
        sendRequest(url, 'GET');
    })

    btnSend.addEventListener('click', function () {
        let data = {
            author: document.getElementById('author').value,
            content: document.getElementById('content').value
        }

        if (data.author.length > 0 && data.content.length > 0) {
            document.getElementById('author').value = '';
            document.getElementById('content').value = '';
            sendRequest(url, 'POST', data);
        }
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
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Something went wrong!');
                }

                return response.json();
            })
            .then(data => dataHandler(data, method))
            .catch(err => textArea.value = err);
    }

    function dataHandler(data, method) {
        if (method === 'GET') {
            for (const key in data) {
                textArea.value += `${data[key].author}: ${data[key].content}\n`;
            }
        }
    }
}

attachEvents();