const http = require('http');
const url = require('url');
const querystring = require('querystring');

const port = 5000;

function requestHandler(req, res) {
    let reqUrl = url.parse(req.url);
    let params = querystring.parse(reqUrl.query);

    switch (reqUrl.pathname) {
        case '/cats':
            res.write('Hello cats!');
            break;
        case '/dogs':
            res.write('Hello dogs!');
            break;
        default:
            res.write('Hello People!');
            break;
    }

    res.end();
}

const app = http.createServer(requestHandler);

app.listen(port, () => console.log(`Server is listening on port ${port}...`));