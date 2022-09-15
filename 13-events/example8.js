// Event max listeners is 10 by default

const EventEmitter = require('node:events')

const myEmitter = new EventEmitter()

// Set max listeners for individual EventEmitter instances
myEmitter.setMaxListeners(20)

// Set max listeners for every EventEmitter instances
// EventEmitter.defaultMaxListeners = 20

// Get max listeners
console.log(myEmitter.getMaxListeners());

for (let i = 0; i < 11; i++) {
    myEmitter.on('event', function () { })
}
