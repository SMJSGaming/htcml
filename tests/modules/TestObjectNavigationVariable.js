const call = "test";

module.exports = {
    init: [
        {
            inner: call
        }
    ],
    test: class TestObjectNavigationVariable {

        constructor(component) {
            const objectParameter = null;
            const raw = component + ".0.inner";
            const page = `<p>${call}</p>`;
            const givenPage = `<p>$%${raw}%;</p>`;
            component = raw.replace(".js", "");
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