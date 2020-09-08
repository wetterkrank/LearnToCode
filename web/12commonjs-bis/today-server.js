const http = require('http');
const url = require('url');
const fs = require('fs');
const moment = require('moment');

const todayHTML = () => {
    const today = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
    return `<div class="date">${today}</div>`;
}

// Server response callback
const response = (req, res) => {

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(todayHTML());
    console.log(res.statusCode);
}

const server = http.createServer(response);
const port = 8080;
server.listen(port);

console.log(`Static server listens at ${port}`);