const call = async (object) => object.param1 + object.param2;

module.exports = {
    init: call,
    test: class TestAsyncMethod {

        constructor(component) {
            const objectParameter = {
                param1: "te",
                param2: "st"
            };
            const raw = `${component}(${JSON.stringify(objectParameter)})`;
            const page = `<p>${objectParameter.param1 + objectParameter.param2}</p>`;
            const givenPage = `<p>$%${raw}%;</p>`;
            component = component.split(".js")[0];
            const expected = {
                variables: [
                    {
                        raw,
                        component,
                        objectParameter,
                        call
                    }
                ],
                page
            };

            this.check = new this.#HTCMLBuilder(givenPage, "./modules", false).asyncBuild()
                .then((result) => ({
                    result,
                    expected
                }));
        }

        #HTCMLBuilder = require("../../HTCMLBuilder");

        check = undefined;
    }
};