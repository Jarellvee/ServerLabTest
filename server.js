const http = require('http');
const url = require('url');
const { fetchDate, appendToFile, readFromFile } = require('./modules/utils');
const MESSAGES = require('./lang/en/messages');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;
    const name = query.name;
    const text = query.text;

    if (path.startsWith('/COMP4537/labs/3/getDate/') || path.startsWith('/COMP4537/labs/3/getDate')) { // PT 2
        res.writeHead(200, { 'Content-Type': 'text/html' }); // to tell that were sending html not plaintxt
        const msg = fetchDate(name); // calls the function from utils.js
        res.end(`<p style="color:blue">${msg}</p>`);


    } else if (path.startsWith('/COMP4537/labs/3/writeFile')) { // PT 3.A
        if (text) {
            appendToFile(text)
                .then(() => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(`<p style="color:blue">${MESSAGES.FILE_WRITTEN}</p>`);
                })
                .catch(() => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(`<p style="color:red">${MESSAGES.FILE_WRITE_ERROR}</p>`);
                });
        } else {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.end(`<p style="color:red">${MESSAGES.NO_WRITE_MSG}</p>`);
        }

    } else if (path.startsWith('/COMP4537/labs/3/readFile/')) { // PT 3.B
        const filename = path.split('/').pop()
        readFromFile(filename)
            .then((text) => {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`<p style="color:blue">Reading from ${filename}: <br>${text}</p>`);
            })
            .catch(() => {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`<p style="color:red">${MESSAGES.FILE_NOT_FOUND.replace('{filename}', filename)}.</p>`);
            });
        return;
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`<p style="color:red">${MESSAGES.NOT_FOUND}</p>`);
    }

});

server.listen(PORT, () => {
    console.log(`running on http://localhost:${PORT}`); // to check
});
