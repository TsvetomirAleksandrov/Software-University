import { beginRequest, endRequest } from './notification.js';
import API from './api.js';

function host(endpoint) {
    return `https://api.backendless.com/6E45D00C-101E-5BF9-FF2C-B81247B4DD00/58BC7FA0-B5E4-41B8-B687-679E1059FB9A/${endpoint}`;
}

const endpoints = {

};

const api = new api(
    'DCF0C447-F13E-7A80-FFBD-B4341C36F400',
    'F994F118-E1BB-49D9-B265-61F3443B2939',
    beginRequest,
    endRequest
);

export const login = api.login.bind(api);
export const register = api.register.bind(api);
export const logout = api.logout.bind(api);