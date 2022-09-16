const fs = require('node:fs')

// Create directory
// Default permission is 0777
// User/owner can read, write, and execute
// Group can read, write, and execute
// Others can read, write, and execute

console.log('going to create dir /src');

// fs.mkdir('./src', function (err) {
//     if (err) console.error(err);

//     console.log('directory created successfully');
// })

// Read directory
fs.readdir('./src', function (err, files) {
    if (err) console.error(err);
    files.forEach(function (file) {
        console.log(file);
    })
})

// Remove a directory
// It cannot remove non empty dir
fs.rmdir('./src', function (err) {
    if (err) console.error(err);

    console.log('going to read dir /src');

    fs.readdir("./src", function (err, files) {
        if (err) {
            return console.error(err);
        }
        files.forEach(function (file) {
            console.log(file);
        });
    });
})