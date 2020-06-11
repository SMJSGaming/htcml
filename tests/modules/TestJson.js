module.exports = {
    test: class TestJson {

        constructor(component) {
            const call = require("./testData/testJson.json").init;
            const objectParameter = null;
            const raw = 
                component.charAt(0).toLowerCase() + component.slice(1).replace(".js", ".json");
            const page = `<p>${call}</p>`;
            const givenPage = `<p>$%${raw}%;</p>`;
            component = raw.split(".json")[0];
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
                result: new this.#HTCMLBuilder(givenPage, "./modules/testData", false).build(),
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