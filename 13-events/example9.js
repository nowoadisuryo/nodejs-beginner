const EventEmitter = require('node:events')

const myEmitter = new EventEmitter()

// Alias to emitter.on()
myEmitter.addListener('event', function () {
    console.log('an event occured');
})

// Returns an array listing the events for which
// the emitter has registered listeners

console.log(myEmitter.eventNames())

// Returns the number of listeners listening to
// event

console.log(myEmitter.listenerCount('event'));

// Returns a copy of the array of listeners function
// for the event
console.log(myEmitter.listeners('event'));

// Use emitter.prependListener() method to add the
// event listener to the beginning of the listeners
// array

myEmitter.prependListener('event', function () {
    console.log('this will be called first');
})

function callbackA() {
    // Remove the specified listener from the listener
    // array for the event
    // Note: you need to specify what listener function
    // to be removed

    myEmitter.removeListener('event', callbackB)
}

function callbackB() {
    console.log('this listener will be removed');
}

myEmitter.on('event', callbackA)
myEmitter.on('event', callbackB)

// Returns a copy of the array of listeners for the event
console.log(myEmitter.rawListeners('event'));

myEmitter.emit('event')
myEmitter.emit('event')