module.exports = {
    test: class TestEmpty {

        constructor() {
            const page = `<p>empty</p>`;
            const expected = {
                variables: [],
                page
            };

            this.check = {
                result: new this.#HTCMLBuilder(page, "./modules", false).build(),
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