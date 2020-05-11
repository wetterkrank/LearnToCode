const http = require('http');
const fs = require('fs');

const allowedNames = /^(\/[\w\-]+\.html)|(\/[\w\-]+\.js)|(\/favicon.ico)$/;
const index = '/index.html';

const response = (req, res) => {
    console.log(req.url);
    
    fname = (allowedNames.test(req.url)) ? req.url : index;
    if (!fs.existsSync('.' + fname)) fname = index;

    if (fname == '/favicon.ico') {
        const BIN = fs.readFileSync(('.' + fname), null);
        res.writeHead(200, {'Content-Type': 'image/x-icon'});
        res.end(BIN);
    }
    else {
        const HTML = fs.readFile(('.' + fname), 'utf8', (err, content) => {
            if (err) throw err;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content);
        });
    }
}

const server = http.createServer(response);

const port = 8080;

server.listen(port);

console.log(`Static server listens at ${port}`);