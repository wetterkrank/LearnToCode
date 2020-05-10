const http = require('http');
const fs = require('fs');

// URL parameter 'key' to look for
const keyPattern = /\/.+key=(.+)$/;

let dataStr = fs.readFileSync('./data.json', 'utf8');
let dataArray = Object.entries(JSON.parse(dataStr));

// console.log('Data init:', dataArray);

// TODO: understand how this works
function keyMatch(matchString) {
    return function(element) {
        return element[0].indexOf(matchString) >= 0;
    }
}

const response = (req, res) => {
    // quietly short-circuit the favicon request
    if (req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'});
        res.end();
        return;
    }
    console.log('Request:', req.url);

    const reqKey = keyPattern.test(req.url) ? keyPattern.exec(req.url)[1] : null;
    // console.log('Requested key:', reqKey);
    // console.log('Match:', dataArray.find(keyMatch(reqKey)));

    const data = (reqKey && dataArray.find(keyMatch(reqKey))) ? dataArray.find(keyMatch(reqKey))[1] : null;
    console.log('Response:', data);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data));
    console.log(res.statusCode)
}

const server = http.createServer(response);
const port = 9090;

server.listen(port);

console.log(`JSON server listens at ${port}`);