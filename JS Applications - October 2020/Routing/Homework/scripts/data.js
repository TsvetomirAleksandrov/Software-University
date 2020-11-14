function host(endpoint) {
return `https://api.backendless.com/983C007B-2422-E5B1-FF02-5596E0910200/20D82483-166B-4E84-B5EE-825F0DEE0849/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login'
}

export async function register(username, password) {
    return (await fetch(host(endpoints.REGISTER), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: username,
            password
        })
    })).json();
   
}

function login(username, password) {
    
}