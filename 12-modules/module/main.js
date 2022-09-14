const eventEmitter = require('./event-emitter.js');

eventEmitter.on('ready', () => {
    console.log("event emitter is ready");
})