const http = require('http');
const url = require('url');
const MESSAGES = require('./lang/en/messages');

/**
 * Server class to handle incoming requests and route them to specific handlers
 * The handlers include getDate(queried with name), writeFile(queried with text), and readFile(queried with filename)
 */
class Server {
    constructor(port) {
        this.port = port;
        this.server = http.createServer(this.requestHandler.bind(this));
        this.utils = require('./modules/utils');
    }

    /**
     * Request handler  for routing incoming requests to specific handlers
     * @param {*} req 
     * @param {*} res 
     */
    requestHandler(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const path = parsedUrl.pathname;
        const query = parsedUrl.query;
        const name = query.name;
        const text = query.text;
        const basePath = '/COMP4537/labs/3/';

        if (path.startsWith(basePath + 'getDate')) {
            this.handleGetDate(res, name);

        } else if (path.startsWith(basePath + 'writeFile')) {
            this.handleWriteFile(res, text);

        } else if (path.startsWith(basePath + 'readFile/')) {
            const filename = path.split('/').pop();
            this.handleReadFile(res, filename);

        } else {
            this.handleNotFound(res, path);
        }
    }

    /**
     * Helper method to handle getDate requests, fetches the message from utils and sends the response
     * @param {*} res 
     * @param {*} name 
     */
    handleGetDate(res, name) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const msg = this.utils.fetchDate(name);
        res.end(`<p style="color:blue">${msg}</p>`);
    }

    /**
     * Helper method to handle writeFile requests, appends the text to the file
     * @param {*} res 
     * @param {*} text 
     */
    handleWriteFile(res, text) {
        if (text) { // checks if there is query parameter text
            this.utils.appendToFile(text)
                .then(() => { // if writing was successful, display success message
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(`<p style="color:blue">${MESSAGES.FILE_WRITTEN}</p>`);
                })
                .catch(() => { // if there was an error writing to the file, display error message
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end(`<p style="color:red">${MESSAGES.FILE_WRITE_ERROR}</p>`);
                });
        } else {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.end(`<p style="color:red">${MESSAGES.NO_WRITE_MSG}</p>`);
        }
    }

    /**
     * Helper method to handle readFile requests, reads the content of the specified file
     * @param {*} res 
     * @param {string} filename, name of  the file to be read
     */
    handleReadFile(res, filename) {
        this.utils.readFromFile(filename)
            .then((text) => { // if read was successful, display the content of the file
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`<p style="color:blue">${MESSAGES.READING_FROM.replace('{filename}', filename).replace('{text}', text)}</p>`);
            })
            .catch(() => {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`<p style="color:red">${MESSAGES.FILE_NOT_FOUND.replace('{filename}', filename)}</p>`);
            });
    }

    /**
     * Helper method to handle 404 Not Found responses
     * @param {} res 
     * @param {string} path 
     */
    handleNotFound(res, path) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`<p style="color:red">${MESSAGES.NOT_FOUND} </p>`);
    }


    /**
     * Method to start the server and listen on the specified port
     */
    start() {
        this.server.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port}`);
        });
    }

}

/**
 * Starter class to initialize and run the server
 */
class Starter {

    /**
     * Method for initializing the server and calling the method to start
     */
    run() {
        const app = new Server(process.env.PORT || 3000); //3000 for local tests
        app.start();
    }
}

new Starter().run();