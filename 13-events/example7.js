// Count listener

const EventEmitter = require('node:events')

const myEmitter = new EventEmitter()

myEmitter.on('event', function () { })
myEmitter.on('event', function () { })

console.log(myEmitter.listenerCount('event'));