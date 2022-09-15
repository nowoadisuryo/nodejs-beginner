// The EventEmitter instance will emit its
// own 'newListener' event before a listener
// is added to its internal array of listeners.

const EventEmitter = require('node:events')

const myEmitter = new EventEmitter()

myEmitter.once('newListener', (eventName, listener) => {
    if (eventName === 'event') {
        myEmitter.on('event', function () {
            console.log('this will come first');
        })
    }
})

myEmitter.on('event', function () {
    console.log('this will come later');
})

myEmitter.emit('event')