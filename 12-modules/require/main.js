// Importing a local module
const foo = require('./local-module.js');

console.log(foo.foo());

// Importing a JSON file
const jsonData = require('./example.json');

console.log(jsonData);

// View cached modules
console.log(require.cache);