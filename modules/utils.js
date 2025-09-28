const MESSAGES = require('../lang/en/messages');
const fs = require('fs');
const path = require('path');

/**
 * Fetches the current date and time, and returns a message
 * The message depends on whether a name is provided or not.
 * @param {String} name , passed from query parameter
 * @returns {String} - the message to be displayed, either with name and date or no name provided message
 */
function fetchDate(name) {
    const currentDate = new Date().toString();

    if (name) {
        const fixedMessage = MESSAGES.NAME_PROVIDED
            .replace('{name}', name)
            .replace('{date}', currentDate)
        return fixedMessage;
    } else {
        return MESSAGES.NO_NAME;
    }
}

/**
 * Appends a text query parameter to a file named file.txt
 * @param {String} message, text to be appended to the file
 * @returns {Promise} - is resolved if writing was a success; else is rejected
 */
function appendToFile(message) {
    const filePath = path.join(__dirname, '..', 'file.txt');

    // Sinec fs.appendFile is asynchronous, we need to return a promise
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, message + ' ', (err) => { // append the message + whitespace
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
/**
 * Reads content from a specified file
 * @param {String} fileName, name of the file to read from
 * @returns {Promise} - is resolved with file content if reading was a success; else is rejected
 * */
function readFromFile(fileName) {
    const filePath = path.join(__dirname, '..', fileName);
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = { fetchDate, appendToFile, readFromFile };