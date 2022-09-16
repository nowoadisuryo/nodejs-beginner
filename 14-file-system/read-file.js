const fs = require('node:fs')

// Read a file using descriptor
let buf = new Buffer.alloc(1024)

fs.open('./input.txt', 'r+', function (err, fd) {
    if (err) console.log(err);

    console.log('file opened successfully');

    // truncate the opened file
    fs.ftruncate(fd, 10, function (err) {
        if (err) console.log(err);

        console.log('file truncated successfully');

        console.log('going to read the file');

        fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
            if (err) console.log(err);

            console.log(bytes + ' bytes read');

            // prints only read bytes to avoid junk
            if (bytes > 0) {
                console.log(buf.slice(0, bytes).toString());
            }

            // close the opened file
            fs.close(fd, function (err) {
                if (err) console.log(err);

                console.log('file closed successfully');
            })
        })
    })
})