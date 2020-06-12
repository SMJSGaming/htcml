/**
 * A library allowing to directly communicate with the backend by using variables in the HTML. 
 * @author SMJS
 * @version 2.0.1
 */
module.exports = class HTCMLBuilder {

    /**
     * The class constructor.
     * @param {String} html The raw HTML page.
     * @param {String} componentRoot The route towards the components folder based on the application root.
     * @param {Boolean} inDirectory A boolean telling the script if the component is in a sub directory or in the main one. 
     */
    constructor(html, componentRoot, inDirectory) {
        this.page = html;
        this.#root = componentRoot;
        this.#inDirectory = inDirectory;
        this.#parseVariables();
    }

    /**
     * The list of variables found on the page with all info which can be provided.
     * @type {Object[]}
     */
    variables = [];
    
    /**
     * The page result page.
     * @type {String}
     */
    page = "";

    /**
     * Whenever an error occurs during the parsing process it will be included in the return object.
     * @type {Error}
     */
    error = undefined;

    /**
     * @see constructor
     * @type {String}
     */
    #root = "";

    /**
     * @see constructor
     * @type {Boolean}
     */
    #inDirectory = false;

    /**
     * Builds the page with the provided variables.
     * @returns {HTCMLBuilder} The class will be returned for inline purposes.
     */
    build() {
        try {
            this.variables.forEach((variable) => {
                let output = "";

                if (typeof variable.call == "function") {
                    output = (variable.call(variable.objectParameter) || "").toString();
                } else {
                    output = (variable.call || "").toString();
                }

                this.page = this.page.replace(`$%${variable.raw}%;`, output);
            });
        } catch(error) {
            this.error = error;
        }
        
        return this;
    }

    /**
     * Builds the page with the provided variables with asynchronous support.
     * @returns {Promise<HTCMLBuilder>} The class will be returned through a promise for inline purposes.
     */
    async asyncBuild() {
        // I wish I could make this a method I could call for both build and asyncBuild but the asynchronous features are too mixed up to make that work.
        try {
            for (let i in this.variables) {
                let output = "";

                if (typeof this.variables[i].call == "function") {
                    output = (await this.variables[i].call(
                        this.variables[i].objectParameter) || "").toString();
                } else {
                    output = (this.variables[i].call || "").toString();
                }

                this.page = this.page.replace(`$%${this.variables[i].raw}%;`, output);
            };
        } catch(error) {
            this.error = error;
        }

        return this;
    }

    /**
     * Parses the variables on the page and sets the variable array with all info about the variable.
     */
    #parseVariables = () => {
        try {
            this.variables = this.page.split("$%")
                .slice(1)
                .map((variable) => {
                    const splitObject = variable.split("(");

                    splitObject[0] = splitObject[0].split("%;")[0]
                        .replace(".json", "")
                        .replace(".js", "");
                    
                    const objectNavigation = splitObject[0].split(".");
                    let call = require.main.require(this.#root + `/${objectNavigation.shift()}`
                        .repeat(+this.#inDirectory + 1)).init;

                    objectNavigation.forEach((key) => call = call[key]);

                    return {
                        raw: variable.split("%;")[0],
                        component: splitObject[0].split(".")[0],
                        objectParameter: JSON.parse((splitObject[1] || "").split(")%;")[0] || null),
                        call
                    };
                });
        } catch(error) {
            this.error = error;
        }
    }
};