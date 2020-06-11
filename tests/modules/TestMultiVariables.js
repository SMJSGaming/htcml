const call = "test";

module.exports = {
    init: call,
    test: class TestMultiVariables {

        constructor(component) {
            const objectParameter = null;
            const raw = component;
            const page = `<p>${call} ${call}</p>`;
            const givenPage = `<p>$%${raw}%; $%${raw}%;</p>`;
            component = component.split(".js")[0];
            const expected = {
                variables: [
                    {
                        raw,
                        component,
                        objectParameter,
                        call
                    },
                    {
                        raw,
                        component,
                        objectParameter,
                        call
                    }
                ],
                page
            };

            this.check = {
                result: new this.#HTCMLBuilder(givenPage, "./modules", false).build(),
                expected
            };
        }

        #HTCMLBuilder = require("../../HTCMLBuilder");

        check = {
            result: undefined,
            expected: undefined
        };
    }
};