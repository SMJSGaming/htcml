const call = "test";

module.exports = {
    init: call,
    test: class TestMultiVariables extends require("../CreateExpectedData") {

        constructor(component) {
            super(component, "", null, call, `<p>${call.repeat(2)}</p>`, 2);

            this.check = {
                result: new this.HTCMLBuilder(this.givenPage, "./modules", false).build(),
                expected: this.expected
            };
        }
    }
};