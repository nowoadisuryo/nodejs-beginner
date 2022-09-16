const fs = require('node:fs')

console.log('going to delete a file');

fs.unlink('./input.txt', function(err) {
    if(err) console.log(err);

    console.log('file deleted successfully');
})