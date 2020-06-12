const call = "test";

module.exports = {
    init: [
        {
            inner: call
        }
    ],
    test: class TestObjectNavigationVariable extends require("../CreateExpectedData") {

        constructor(component) {
            super(component, ".0.inner", null, call, `<p>${call}</p>`, 1);
            
            this.check = {
                result: new this.HTCMLBuilder(this.givenPage, "./modules", false).build(),
                expected: this.expected
            };
        }
    }
};