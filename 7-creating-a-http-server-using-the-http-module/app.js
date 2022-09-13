import * as http from 'http';

const server = http.createServer((req, res) => {
    // res.write('Hello world!\n');
    // res.end();

    if (req.url === '/') {
        res.write('Hello world!\n');
        res.end();
    } else {
        res.write('Using some other path\n');
        res.end();
    }
});

server.listen('3000');