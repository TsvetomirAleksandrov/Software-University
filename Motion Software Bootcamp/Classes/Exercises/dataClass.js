class Request {
    constructor(method, uri, version, message) {
        this.message = message;
        this.uri = uri;
        this.method = method;
        this.version = version;
        this.response = undefined;
        this.fulfilled = false;
    }
}