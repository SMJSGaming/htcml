# HTCML

A library allowing to directly communicate with the backend by using variables in the HTML.

## Installing

Simply run `npm install htcml` in a terminal located in a directory which has been npm initialized.

## Usage

You can trigger a component by calling `$%componentName%;` in case you want to call the variable `init` in the module export. An alternative is calling `$%componentName()%;` in case the `init` module export is a function, you can provide a single JSON object as a parameter or anything else which can be parsed by `JSON.parse`.

### Component variable

```js
// Path: ./components/example1.js
module.exports.init = "example";
```

### Json component variable

Path: ./components/example2.json

```json
{
  "init": "example"
}
```

### Component function

```js
// Path: ./components/example3.js
module.exports.init = (object) => object.entry1 + object.entry2;
```

### HTCML calls

```html
<!-- Path: ./page.html -->
<p>$%example1%;</p>
<p>$%example2.json%;</p>
<p>$%example3({
    entry1: "exam",
    entry2: "ple"
})%;</p>
<!-- Returns example 3 times -->
```

### Initialize

```js
const fs = require("fs");
const htcml = require("htcml");

// The raw HTCML which should be parsed to HTML.
const rawPage = fs.readFileSync("./page.html", "utf8");

// The location where all components are located.
const componentRoot = "./components";

// Whether the components are located in directories withing the components folder.
const inDirectory = false;

/*
  The HTCML class will be constructed and can inline be build.
  An alternative is to construct the class and modify the variables or page before building it.
  After building it the object will be returned.
*/
const result = new htcml(rawPage, componentRoot, inDirectory).build();

// An alternative in case asynchronous objects need to be used.
new htcml(rawPage, componentRoot, inDirectory).asyncBuild().then((result) => /* Use the result */);
```

### Page

```js
console.log(result.error || result.page);
// Returns either an error if any occurred or it returns the formatted page.
```

### Variables

```js
console.log(result.error || result.variables);
/*
  Returns either an error if any occurred or it returns an object array containing:

  raw: The raw variable as it's written in the HTCML.
  component: The component name to call.
  objectParameter: The parameter which should be given to the method.
  call: The function/parameter to call.
*/
```

### Conventions

- If you provide an object to a component call it's expected that no `)%;` is anywhere in the object.
- When you set the `inDirectory` to true it's expected that the component file is located in a directory with the same name as the component (so `example1.js` should be in `example1`).
- It's expected that the component route is relative to the process root just like how `fs` works.
- When calling a JSON component it's required that you add `.json` behind the call.

### Exceptions

- A backend call does not require returning anything and will make the spot of the call empty if no return value was provided.
- You can provide the filetype behind a call.
- HTCML can be initialized on any string, it does not per se have to be a HTML string.
