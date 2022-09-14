function foo() {
    console.log(__dirname);
    console.log(__filename);
    return 'bar';
}

module.exports.foo = foo();