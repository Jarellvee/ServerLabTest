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

module.exports = { fetchDate };