const call = require("./testData/testJson.json").init;

module.exports = {
    test: class TestJson extends require("../CreateExpectedData") {

        constructor(component) {
            super(component, "", null, call, `<p>${call}</p>`, 1);

            this.check = {
                result: new this.HTCMLBuilder(
                    this.givenPage, "./modules/testData", false).build(),
                expected: this.expected
            };
        }
    }
};