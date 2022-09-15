// Using the eventEmitter.once() method,
// it is possible to register a listener
// that is called at most once for a particular event

const EventEmitter = require('node:events')

const myEmitter = new EventEmitter()

let m = 0;

myEmitter.once('event', function() {
    console.log(++m);
})

myEmitter.emit('event')
myEmitter.emit('event')