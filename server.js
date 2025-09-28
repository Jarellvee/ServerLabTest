const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;
    const name = query.name;
    const currentDate = new Date().toDateString();
    const localTime = new Date().toLocaleTimeString();

    if (path === '/COMP4537/labs/3/getDate/' || path === '/COMP4537/labs/3/getDate') {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        if (name) {
            res.end(`<p style="color:blue">
                Hello ${name}, What a beautiful day. Server current date and time is ${currentDate},  ${localTime} PST.
            </p>`);
        } else {
            res.end(`<p style="color:blue">
                No name provided, please include your name in the query string. e.g. ?=name=Name
            </p>`);
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<p style="color:red">404 Not Found</p>');
    }

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`); // to check
});
