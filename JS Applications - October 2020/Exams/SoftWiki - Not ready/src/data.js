import { getUserData, getUserId, objectToArray, setUserData } from "./util.js";

const apiKey = 'AIzaSyAXFWJ-Zi_LwVONks-DJMBcKZnk6VMwu18';
const databaseUrl = 'https://softwiki-88216.firebaseio.com/';

const endpoints = {
    LOGIN: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
    REGISTER: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
    ARTICLES: 'articles',
    ARTICLE_BY_ID: 'articles/',
};

function host(url) {
    let result = databaseUrl + url + '.json';
    const auth = getUserData();
    if (auth !== null) {
        result += `?auth=${auth.idToken}`;
    }
    return result;
}

async function request(url, method, body) {
    let options = {
        method,
    };

    if (body) {
        Object.assign(options, {
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }

    let response = await fetch(url, options);

    let data = await response.json();

    return data;
}

async function get(url) {
    return request(url, 'GET');
}

async function post(url, body) {
    return request(url, 'POST', body);
}

async function del(url) {
    return request(url, 'DELETE');
}

async function patch(url, body) {
    return request(url, 'PATCH', body);
}

export async function login(email, password) {
    let response = await post(endpoints.LOGIN + apiKey, {
        email,
        password,
        returnSecureToken: true
    });

    let data = await response.json();

    setUserData(data);

    return data;
}

export async function register(email, password) {
    let res = await post(endpoints.REGISTER + apiKey, {
        email,
        password,
        returnSecureToken: true
    });

    setUserData(res);

    return res;
}

export async function getAll() {
    const records = await get(host(endpoints.ARTICLES));
    return objectToArray(records);
}

export async function getById(id) {
    const record = await get(host(endpoints.ARTICLE_BY_ID + id));
    record._id = id;
    return record;
}

export async function createArticle(article) {
    const data = Object.assign({ _ownerId: getUserId() }, article);
    return post(host(endpoints.ARTICLES), data);
}

export async function editArticle(id, article) {
    return patch(host(endpoints.ARTICLE_BY_ID + id), article);
}

export async function deleteById(id) {
    return del(host(endpoints.ARTICLE_BY_ID + id));
}