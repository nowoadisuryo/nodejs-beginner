// Assignment to module.exports must be done immediately

const EventEmitter = require('events');

module.exports = new EventEmitter();

setTimeout(() => {
    module.exports.emit('ready');
}, 1000);