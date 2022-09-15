// Listener functions can switch to an
// asynchronous mode of operation using
// the setImmediate() or process.nextTick()

const EventEmitter = require('node:events')

const myEmitter = new EventEmitter()

myEmitter.on('event', (a, b) => {
    setImmediate(() => {
        console.log('this happens asynchronously');
    })
})

myEmitter.emit('event', 'nowo', 'adi')