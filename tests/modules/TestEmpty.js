const call = () => undefined;

module.exports = {
    init: call,
    test: class TestEmpty extends require("../CreateExpectedData") {

        constructor(component) {
            super(component, "", null, call, `<p></p>`, 0);

            this.check = {
                result: new this.#HTCMLBuilder(this.givenPage, "./modules", false).build(),
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