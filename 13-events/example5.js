// Listen to error events

const EventEmitter = require('node:events')

const myEmitter = new EventEmitter()

myEmitter.on('error', function (err) {
    console.log('whoops an error occured\n' + err);
})

myEmitter.emit('error', new Error('whoops!'));