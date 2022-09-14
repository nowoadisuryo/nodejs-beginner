const foo = require.resolve('bar.js', {
    paths: ['example']
})

console.log(foo);

const foo2 = require.resolve.paths('bar.js');

console.log(foo2);