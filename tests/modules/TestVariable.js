const call = "test";

module.exports = {
    init: call,
    test: class TestVariable extends require("../CreateExpectedData") {

        constructor(component) {
            super(component, "", null, call, `<p>${call}</p>`, 1);

            this.check = {
                result: new this.HTCMLBuilder(this.givenPage, "./modules", false).build(),
                expected: this.expected
            };
        }
    }
};