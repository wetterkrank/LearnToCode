const http = require('http');
const url = require('url');
const fs = require('fs');

const allowedNames = /^\/[\w\-\_]+(.[\w\-\_]+)$/;
const index = '/index.html';
const pubDir = './public';
const mimeTypes = {
    '.html': { 'type': 'text/html', 'enc': 'utf8' },
    '.js': { 'type': 'application/javascript', 'enc': 'utf8' },
    '.css': { 'type': 'text/css', 'enc': 'utf8' },
    '.ico': { 'type': 'image/x-icon', 'enc': null }
};

// We read the data file once on start now
const dataArray = Object.entries(JSON.parse(fs.readFileSync('./data/data.json', 'utf8')));

// Server response callback
const response = (req, res) => {
    // TODO: serve favicon normally
    if (req.url == '/favicon.ico') {
        const bin = fs.readFileSync((pubDir + '/favicon.ico'), null);
        res.writeHead(200, {'Content-Type': 'image/x-icon'});
        res.end(bin);
        return;
    }

    let q = url.parse(req.url, true);

    // Data server part
    if (q.pathname == '/' && q.query.key) {

        // TODO: understand how this argument thing works
        function keyMatch(matchString) {
            return function(element) {
                return element[0].indexOf(matchString) >= 0;
            }
        }
        let key = q.query.key;
        const data = (key && dataArray.find(keyMatch(key))) ? dataArray.find(keyMatch(key))[1] : null;

        // TODO: 204 or 404 when not found?
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(data));
        console.log(res.statusCode);
        return;
    }

    // Static server part
    if (q.pathname == '/') q.pathname = index;
    if (allowedNames.test(q.pathname)) {

        let fname = q.pathname;
        let fext = allowedNames.exec(fname)[1];

        if (fs.existsSync(pubDir + fname)) {
            const contents = fs.readFileSync((pubDir + fname), 'utf8');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(contents);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('Not found');
        }
    } else {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end('Bad request');
    }
    console.log(res.statusCode);
}

const server = http.createServer(response);
const port = 8080;
server.listen(port);

console.log(`Static server listens at ${port}`);