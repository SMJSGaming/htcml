module.exports = class InvalidException {

    constructor(objectChild, expected, given, page) {
        const exp = `${typeof expected}:${JSON.stringify(expected)}`;
        const giv = `${typeof given}:${JSON.stringify(given)}`;
        
        this.error = 
            `Invalid ${objectChild} output at ${page}. Expected: ${exp}, Given: ${giv}`;
    }

    error = "";
};