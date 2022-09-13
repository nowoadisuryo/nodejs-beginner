import * as http from 'http';
import * as fs from 'fs';

http.createServer((req, res) => {
    // const readStream = fs.createReadStream('./static/index.html');
    // const readStream = fs.createReadStream('./static/example.json');
    const readStream = fs.createReadStream('./static/nodejs-logo.jpg');
    res.writeHead(200, { "Content-Type": "image/jpg" });
    readStream.pipe(res);
}).listen(3000)