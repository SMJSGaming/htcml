const call = (object) => object.param1 + object.param2;
const objectParameter = {
    param1: "te",
    param2: "st"
};

module.exports = {
    init: call,
    test: class TestSyncMethod extends require("../CreateExpectedData") {

        constructor(component) {
            super(component,
                `(${JSON.stringify(objectParameter)})`,
                objectParameter,
                call,
                `<p>${objectParameter.param1 + objectParameter.param2}</p>`,
                1);

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