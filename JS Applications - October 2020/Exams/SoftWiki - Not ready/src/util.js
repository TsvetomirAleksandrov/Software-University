export function setUserData(data) {
    sessionStorage.setItem('auth', JSON.stringify(data));
}

export function getUserData() {
    const auth = sessionStorage.getItem('auth');
    if (auth !== null) {
        return JSON.parse(auth);
    } else {
        return null;
    }
}

export function getUserId() {
    const auth = sessionStorage.getItem('auth');
    if (auth !== null) {
        return JSON.parse(auth).localId;
    } else {
        return null;
    }
}

export function objectToArray(data) {
    return Object.entries(data).map(([k, v]) => Object.assign({ _id: k }, v));
}

window.objectToArray = objectToArray;

