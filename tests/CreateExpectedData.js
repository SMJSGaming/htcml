module.exports = class CreateExpectedData {

    constructor(component, extra, objectParameter, call, page, times) {
        const raw = component + extra;
        component = component.split(".js")[0];
        this.givenPage = `<p>${`$%${raw}%;`.repeat(times)}</p>`;

        this.expected = {
            variables: Array(times).fill({
                raw,
                component,
                objectParameter,
                call
            }),
            page
        };
    }

    expected = {};

    givenPage = "";

    HTCMLBuilder = require("../HTCMLBuilder");

    check;
};