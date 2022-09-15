const EventEmitter = require('node:events');

const myEmitter = new EventEmitter();

myEmitter.on('event', () => {
    console.log('an event occured');
})

myEmitter.emit('event')