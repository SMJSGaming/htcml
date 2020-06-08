/**
 * A library allowing to directly communicate with the backend by using variables in the HTML.
 * 
 * Quite frankly you can basically use this on all files but lets just assume you use it for its purpose.
 * @author SMJS
 * @version 1.2.0
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
     * Parses the variables on the page and sets the variable array with all info about the variable.
     */
    #parseVariables = () => {
        try {
            this.variables = this.page.split("$%")
                .slice(1)
                .map((variable) => {
                    const splitObject = variable.split("(");

                    if (splitObject[0].includes("%;")) {
                        splitObject[0] = splitObject[0].split("%;")[0];
                    }

                    return {
                        raw: variable.split("%;")[0],
                        component: splitObject[0],
                        objectParameter: JSON.parse((splitObject[1] || "").split(")%;")[0] || null),
                        // @ts-ignore since vsc doesn't like single file projects which use require in any way with checkJs
                        call: require.main.require(
                            this.#root + `/${splitObject[0]}`.repeat(+this.#inDirectory + 1)).init
                    };
                });
        } catch(error) {
            this.error = error;
        }
    }
};