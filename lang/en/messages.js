const MESSAGES = {
    NAME_PROVIDED: "Hello {name}, What a beautiful day. Server current date and time is {date}.",
    NO_NAME: "No name provided, please include a name in the query",
    NOT_FOUND: "404 Not Found, Check the URL and try again",
    FILE_WRITTEN: "File writing was successful, check with readFile endpoint",
    NO_WRITE_MSG: "No input provided, please include an input in the query",
    FILE_WRITE_ERROR: "There was an error writing to the file, please try again",
    FILE_NOT_FOUND: "The file {filename} was not found, ensure the file name is file.txt"
};
module.exports = MESSAGES;