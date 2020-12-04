import authService from './services/authService.js';

export const onLoginSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);

    let email = formData.get('email');
    let password = formData.get('password');

    authService.login(email, password)
    .then(data => {
        console.log(`you are logged with ${data.email}`);
    })
}