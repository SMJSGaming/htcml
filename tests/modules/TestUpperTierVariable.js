const call = require("./testData/testUpperTierVariable/testUpperTierVariable").init;

module.exports = {
    test: class TestUpperTierVariable extends require("../CreateExpectedData") {

        constructor(component) {
            super(component, "", null, call, `<p>${call}</p>`, 1);

            this.check = {
                result: new this.#HTCMLBuilder(
                    this.givenPage, "./modules/testData", true).build(),
                expected: this.expected
            };
        }

        #HTCMLBuilder = require("../../HTCMLBuilder");

        check = {
            result: undefined,
            expected: undefined
        };
    }
};