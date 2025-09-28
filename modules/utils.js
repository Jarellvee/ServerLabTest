const MESSAGES = require('../lang/en/messages');

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

function appendToFile(message) {
    const fs = require('fs');
    const path = require('path');

    const filePath = path.join(__dirname, '..', 'file.txt');

    // Sinec fs.appendFile is asynchronous, we need to return a promise
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, message + ' ', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = { fetchDate, appendToFile };