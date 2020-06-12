const call = async (object) => object.param1 + object.param2;
const objectParameter = {
    param1: "te",
    param2: "st"
};

module.exports = {
    init: call,
    test: class TestAsyncMethod extends require("../CreateExpectedData") {

        constructor(component) {
            super(component,
                `(${JSON.stringify(objectParameter)})`,
                objectParameter,
                call,
                `<p>${objectParameter.param1 + objectParameter.param2}</p>`,
                1);

            this.check = new this.#HTCMLBuilder(this.givenPage, "./modules", false).asyncBuild()
                .then((result) => ({
                    result,
                    expected: this.expected
                }));
        }

        #HTCMLBuilder = require("../../HTCMLBuilder");

        check = undefined;
    }
};