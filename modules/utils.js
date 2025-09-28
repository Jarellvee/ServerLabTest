const MESSAGES = require('../lang/en/messages');

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