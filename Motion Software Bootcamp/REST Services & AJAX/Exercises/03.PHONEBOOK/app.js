function attachEvents() {
    let btnLoad = document.getElementById('btnLoad');
    let btnCreate = document.getElementById('btnCreate');
    let outputUl = document.getElementById('phonebook');

    btnLoad.addEventListener('click', function () {
        outputUl.textContent = '';
        sendRequest(`https://phonebook-nakov.firebaseio.com/phonebook.json`, 'GET');
    })

    btnCreate.addEventListener('click', function () {
        let data = {
            person: document.getElementById('person').value,
            phone: document.getElementById('phone').value
        }

        if (!(data.person.length > 0 && data.phone.length > 0)) {
            outputUl.textContent = 'Fill the fields!';
        } else {
            outputUl.textContent = 'Created';
            sendRequest(`https://phonebook-nakov.firebaseio.com/phonebook.json`, 'POST', data)
        }
    })

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
                    throw new Error('Invalid Request!');
                }

                return response.json()
            })
            .then(data => dataHandler(data, method))
            .catch(err => outputUl.textContent = err)
    }

    function dataHandler(data, method) {
        if (method === 'GET') {
            for (const record in data) {
                let li = document.createElement('li');
                li.textContent = `${data[record].person}: ${data[record].phone}`
                li.appendChild(createDeleteBtn(record))
                outputUl.appendChild(li);
            }
        }
    }

    function createDeleteBtn(key) {
        let button = document.createElement('button');
        button.textContent = `DELETE`;
        button.addEventListener('click', function (e) {
            e.target.parentNode.remove();
            let url = `https://phonebook-nakov.firebaseio.com/phonebook/${key}.json`;
            sendRequest(url, 'DELETE');
        })
        return button;
    }

}

attachEvents();