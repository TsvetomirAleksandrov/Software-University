function deleteByEmail() {
    let allUsers = document.getElementById('customers').getElementsByTagName('td');
    let inputUserElement = document.querySelector('input[type=text]');
    let found = false;

    for (user of allUsers) {
        if (inputUserElement.value === user.textContent) {
            deleteUser(user);
            inputUserElement.value = '';
            document.getElementById('result').textContent = 'Deleted.';
            found = true;
        }
    }

    if (!found) {
        document.getElementById('result').textContent = 'Not found.';
    }

    function deleteUser(user) {
        user.parentNode.remove();
    }
}