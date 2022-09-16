const fs = require('fs')

// Async read
fs.readFile('./input.txt', function (err, data) {
    if (err) console.log(err);
    else console.log('Async read: ' + data.toString());
})

let data = fs.readFileSync('./input.txt')
console.log('Sync read: ' + data.toString());

console.log('this will not blocked by async method');

// Open a file
// Flags
// r : open file for reading
// r+ : open file for reading and writing
// rs : open file for reading in sync mode
// rs+ : open file for reading and writing
// asking the OS to open it sync
// w : open file for writing
// wx : like w but fails if the path exists
// w+ : open file for reading and writing
// the file is created or truncated
// wx+ : like w+ but fail if the path exists
// a : open for appending
// ax : like a but fails if the path exists
// a+ : open file for reading and appending.
// the file is created if it does not exist
// ax+ : like a+ but fails if the path exists

// Async open file
console.log('going to open file\n');

fs.open('./input.txt', 'r+', function (err, fd) {
    if (err) console.log(err)
    else console.log('File opened successfully');
})

// Get File Information
// stats.isFile()
// stats.isDirectory()
// stats.isBlockDevice()
// stats.isCharacterDevice()
// stats.isSymbolicLink()
// stats.isFIFO()
// stats.isSocket()

fs.stat('./input.txt', function(err, stats) {
    if(err) console.log(err)

    console.log(stats);
    console.log('is File? ' + stats.isFile());
    console.log('is Directory? ' + stats.isDirectory());
})

// Write to a file
// The method will over-write the file if it already exists
console.log('going to write into existing file');
fs.writeFile('./input.txt', 'Overwrite by write method', function(err) {
    if(err) console.log(err);

    console.log('Data written successfully');
    console.log('let\'s read newly written data');

    fs.readFile('./input.txt', function(err, data) {
        if(err) console.log(err);
        console.log('async read inside write method: ' + data.toString());
    })
})

// Append to a file
fs.appendFile('./input.txt', 'Appended content', function(err) {
    if(err) console.error(err);

    console.log('append operation complete');
})