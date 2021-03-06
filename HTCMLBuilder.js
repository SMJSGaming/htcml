/**
 * A library made to directly communicate with the backend by using variables in the HTML. 
 * @author SMJS
 * @version 2.1.0
 */
module.exports = class HTCMLBuilder {

    /**
     * The class constructor.
     * @param {String} html The raw HTML page.
     * @param {String} componentRoot The root towards the components folder based on the application root.
     * @param {Boolean} inDirectory A boolean telling the script if the component is in a sub directory or in the provided root. 
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
     * The return page.
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
            this.variables.forEach((variable) => this.page = this.page.replace(
                `$%${variable.raw}%;`, 
                (this.#getCall(variable) || "").toString()
            ));        
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
                this.page = this.page.replace(
                    `$%${this.variables[i].raw}%;`,
                    (await this.#getCall(this.variables[i]) || "").toString()
                );
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
            this.variables = this.page
                .split("$%")
                .slice(1)
                .map((variable) => {
                    const raw = variable.split("%;")[0];
                    const objectNavigation = raw.replace(/.js(on)?/, "").split(".");
                    const component = objectNavigation.shift().split("(")[0];
                    let call = require.main.require(this.#root + `/${component}`.repeat(+this.#inDirectory + 1)).init;

                    objectNavigation.forEach((key) => call = call[key.split("(")[0]]);

                    return {
                        raw,
                        component,
                        objectParameter: JSON.parse(raw.split("(").slice(1).join("(").split(")").slice(0, -1).join(")") || null),
                        call
                    };
                });
        } catch(error) {
            this.error = error;
        }
    }

    #getCall = (variable) => {
        try {
            if (typeof variable.call == "function") {
                return variable.call(variable.objectParameter);
            } else {
                return variable.call;
            }
        } catch(error) {
            this.error = error;
        }
    }
}