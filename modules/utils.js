const MESSAGES = require('../lang/en/messages');

function fetchDate(name) {
    const currentTime = new Date.tolocaleTimeString();
    const currentDate = new Date.toDateString();

    if (name) {
        const fixedMessage = MESSAGES.NAME_PROVIDED
            .replace('{name}', name)
            .replace('{date}', currentDate)
            .replace('{time}', currentTime);
        return fixedMessage;
    } else {
        return MESSAGES.NO_NAME;
    }
}

module.exports = { fetchDate };