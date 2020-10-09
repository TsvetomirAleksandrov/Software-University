function deleteByEmail() {
    let allUsers = document.getElementById('customers').getElementsByTagName('td');
    let inputUserElement = document.getElementsByTagName('input')[0];
    let found = false

    for (let user of allUsers) {
        if (user.textContent === inputUserElement.value) {
            user.parentNode.remove();
            inputUserElement.value = '';
            document.getElementById('result'.textContent = 'Deleted.');
            found = true;
        }
    }

    if(!found) {
        document.getElementById('result').textContent = 'Not found.'
    }
}