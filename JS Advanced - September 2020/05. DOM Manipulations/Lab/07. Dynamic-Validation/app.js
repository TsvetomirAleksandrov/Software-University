function validate() {
    let email = document.getElementById('email');
    email.addEventListener('change', check);

    function check(e) {
        if (!(/[a-z0-9]+\@[a-z]+\.[a-z]+/).test(e.target.value)) {
            e.target.classList.add('error');
        } else {
            e.target.classList.remove('error');
        }
    }
}