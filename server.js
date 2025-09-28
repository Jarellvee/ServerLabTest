const http = require('http');
const url = require('url');
const { fetchDate } = require('./modules/utils');
const MESSAGES = require('./lang/en/messages');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;
    const name = query.name;

    if (path === '/COMP4537/labs/3/getDate/' || path === '/COMP4537/labs/3/getDate') {
        res.writeHead(200, { 'Content-Type': 'text/html' }); // to tell that were sending html not plaintxt
        const msg = fetchDate(name); // calls the function from utils.js
        res.end(`<p style="color:blue">${msg}</p>`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`<p style="color:red">${MESSAGES.NOT_FOUND}</p>`);
    }
});

server.listen(PORT, () => {
    console.log(`running on http://localhost:${PORT}`); // to check
});
