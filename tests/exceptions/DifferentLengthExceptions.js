module.exports = class DifferentLengthExceptions extends Error {

    constructor(objectChild, expected, given, page) {
        super(`Invalid array length for ${objectChild} at ${page}. Expected ${
            expected} length, Given ${given} length`);

        this.name = "Invalid array length exception";
    }
};