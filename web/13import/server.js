const http = require('http');
const url = require('url');
const fs = require('fs');

const allowedNames = /^\/[\/\w\-\_]+(.[\w\-\_]+)$/;
const index = '/index.html';
const pubDir = './public';
const dataFile = './data/data.json';
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.ico': 'image/x-icon',
    '.png': 'image/png'
};

// We read the data file once on start now
const dataArray = Object.entries(JSON.parse(fs.readFileSync(dataFile, 'utf8')));

// Server response callback
const response = (req, res) => {
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

        let contentType = mimeTypes[fext] || 'application/octet-stream';

        fs.readFile((pubDir + fname), (err, contents) => {
            if (err) {
                if (err.code == 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end('Not found');
                } else {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end('Server error');
                    console.log(err);
                }
            } else {
                // TODO: return Content-Type based on extension
                res.writeHead(200, {'Content-Type': contentType});
                res.end(contents, 'utf-8');
            }
            console.log(res.statusCode);
        });
    } else {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end('Bad request');
        console.log(res.statusCode);
    }
}

const server = http.createServer(response);
const port = 8080;
server.listen(port);

console.log(`Static/data server listens at ${port}`);