/**
 * A test script to validate that the update gives the right data.
 * @author SMJS
 * @version 2.0.0
 */
const fs = require("fs");
const InvalidException = require("./exceptions/InvalidException");

fs.readdir("./tests/modules", async (error, files) => {
    let check = {};

    for (let i in files) {
        if (files[i].endsWith(".js")) {
            check = await new (require(`./modules/${files[i]}`).test)(files[i]).check;

            try {
                if (check.result.error) {
                    throw check.result.error;
                } else {
                    validateTree(check.expected, check.result, "", files[i]);
                }
                
                console.log(files[i].split(".")[0] + " test succeeded!");
            } catch(error) {
                console.error(error);
            }
        }
    }
});

function validateTree(expected, result, root, page) {
    Object.keys(expected).forEach((key) => {
        if (typeof expected[key] == "object" && expected[key] != null) {
            validateTree(expected[key], result[key], addKey(root, key), page);
        } else if (expected[key] != result[key]) {
            throw new InvalidException(
                addKey(root, key), expected[key], result[key], page).error;
        }
    });
}

function addKey(root, key) {
    if (/^\d+$/.test(key) || key.includes("-")) {
        root += `[${key}]`;
    } else {
        if (root != "") {
            root += ".";
        }
        root += key;
    }

    return root;
}