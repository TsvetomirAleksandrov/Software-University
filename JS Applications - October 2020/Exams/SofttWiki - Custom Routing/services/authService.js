import login from '../views/login.js';
import request from './request.js';

const apiKey = 'AIzaSyAXFWJ-Zi_LwVONks-DJMBcKZnk6VMwu18';
const baseUrl = 'https://softwiki-88216.firebaseio.com';

let endpoints = {
    login: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
}

export default {
    async login(email, password) {
        let data = request.post(endpoints.login,
            {
                email,
                password
            });

        localStorage.setItem('auth', JSON.stringify(data));

        return data;
    }
}