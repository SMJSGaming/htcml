module.exports = class InvalidException extends Error {

    constructor(objectChild, expected, given, page) {
        super(`Invalid ${objectChild} output at ${page}. Expected: ${
            typeof expected}:${expected}, Given: ${typeof given}:${given}`);

        this.name = "Invalid output exception";
    }
};