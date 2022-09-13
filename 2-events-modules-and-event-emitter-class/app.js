import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();

eventEmitter.on('tutorial', (num1, num2) => {
    console.log('result: ' + parseInt(num1 + num2));
});

eventEmitter.emit('tutorial', 4, 5);

class Person extends EventEmitter {
    constructor(name) {
        super();
        this._name = name;
    }

    get name() {
        return this._name;
    }
}

const nowo = new Person('Nowo Adi Suryo');
const nurul = new Person('Nurul Aini');

nurul.on('name', () => { 
    console.log('My name is ' + nurul.name);
})

nowo.on('name', () => {
    console.log('My name is ' + nowo.name);
})

nurul.emit('name');
nowo.emit('name');