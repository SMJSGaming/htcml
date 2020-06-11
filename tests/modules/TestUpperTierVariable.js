module.exports = {
    test: class TestUpperTierVariable {

        constructor(component) {
            const call = 
                require("./testData/testUpperTierVariable/testUpperTierVariable").init;
            const objectParameter = null;
            const raw = component.charAt(0).toLowerCase() + component.slice(1);
            const page = `<p>${call}</p>`;
            const givenPage = `<p>$%${raw}%;</p>`;
            component = raw.split(".js")[0];
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
                result: new this.#HTCMLBuilder(givenPage, "./modules/testData", true).build(),
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