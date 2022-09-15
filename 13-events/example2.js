const EventEmitter = require('node:events')

// Passing arguments and this to listeners

const myEmitter = new EventEmitter();

myEmitter.on('event', function (a, b) {
    console.log(a, b, this === myEmitter);
})

// If use ES6 Arrow Functions as listeners, the
// this keyword will no longer reference the
// EventEmitter instance

myEmitter.on('event', (a, b) => {
    console.log(a, b, this === myEmitter);
})


myEmitter.emit('event', 'nowo', 'adi');