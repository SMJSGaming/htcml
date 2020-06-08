/**
 * A test script to validate that the update gives the right data.
 * @author SMJS
 * @version 1.0.0
 */
module.exports.init = "test";

const testExport = this.init;
const testHtml = "<p>$%test%;</p>";
const expected = {
    page: testHtml.replace("$%test%;", testExport),
    variables: [
        {
            raw: "test",
            component: "test",
            objectParameter: null,
            call: testExport
        }
    ]
};
const HTCMLBuilder = require("./HTCMLBuilder");
const result = new HTCMLBuilder(testHtml, ".", false).build();
const InvalidException = class {

    constructor(objectChild, expected, given) {
        const exp = JSON.stringify(expected);
        const giv = JSON.stringify(given);
        
        this.error = `Invalid ${objectChild} output. Expected: ${exp}, Given: ${giv}`;
    }

    error = "";
};

if (result.page == expected.page) {
    if (JSON.stringify(result.variables) == JSON.stringify(expected.variables)) {
        console.log("Success!");
    } else {
        throw new InvalidException(
            "variables", expected.variables, result.variables).error;
    }
} else {
    throw result.error || 
        new InvalidException("page", expected.page, result.page).error;
}