const request = async (method, url, body) => {
    let options = {
        method,
    };

    if (body) {
        Object.assign(options, {
            headers: {
                'content-type': 'applications/json'
            },
            body: JSON.stringify(body)
        });
    }

    let response = await fetch(url, options);

    let data = await response.json();

    return data;
}

export default {
    get: request.bind(this, 'GET'),
    post: request.bind(this, 'POST'),
    put: request.bind(this, 'PUT'),
    patch: request.bind(this, 'PATCH'),
    delete: request.bind(this, 'DELETE')
}